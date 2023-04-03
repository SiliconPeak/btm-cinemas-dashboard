import { Role } from "../models/role.model.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/jwt.config.js";
import { apiErrorResponse, apiSuccessResponse } from "../helpers/functions.js";
import { MESSAGE } from "../helpers/response.message.js";

export const registraterUser = async (req, res, next) => {
  try {
    const data = req.body;
    const usrEmail = data.usrEmail;
    const role = await Role.findByPk(data.roleId);
    if (!role) {
      return res.json(apiErrorResponse(404, MESSAGE.ROLE_NOT));
    }
    const userCheck = await User.findOne({ where: { usrEmail } });
    if (userCheck) {
      return res.status(409).json(apiErrorResponse(409, MESSAGE.USER_DUPLICATE));
    }
    if (req.file) {
      data.profileImage = req.file.filename;
    }
    data.usrPassword = bcrypt.hashSync(req.body.usrPassword, 10);
    data.roleId = role.id;

    const user = await User.create(data);
    user.save();
    if (!user) return res.status(404).json(apiErrorResponse(404, MESSAGE.USER_ERROR_REGISTER));

    res.status(200).json(apiSuccessResponse(200, MESSAGE.USER_REGISTER));
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { usrEmail, usrPassword } = req.body;

    const user = await User.findOne({
      where: { usrEmail: usrEmail },
      include: [{ model: Role, as: "role" }],
    });

    if (user.status == 'inactive') return res.status(403).json(apiErrorResponse(403, MESSAGE.USER_NOT_LOGIN));
    if (!user) return res.status(404).json(apiErrorResponse(404, MESSAGE.USER_NOT));

    const isValid = bcrypt.compareSync(usrPassword, user.usrPassword);

    if (!isValid)
      return res.status(404).json(apiErrorResponse(404, MESSAGE.USER_PWD_ERROR));

    const token = jwt.sign(
      {
        id: user.id,
        roleId: user.roleId,
        name: user.usrName,
      },
      JWT_SECRET.VAL,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      status: 200,
      data: {
        id: user.id,
        name: user.usrName,
        profileImage: user.profileImage,
        email: user.usrEmail,
      },
      token: token,
      message: MESSAGE.USER_LOGIN,
    });
  } catch (error) {
    console.log(error);
  }
};
