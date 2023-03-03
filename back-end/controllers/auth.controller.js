import { Role } from "../models/role.model.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { apiResponse } from "../helpers/functions.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/jwt-config.js";

export const registraterUser = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const role = await Role.findByPk(data.roleId);
    if (!role) {
      return res.status(400).send({ msg: "Role does not found" });
    }
    if (req.file) {
      data.profileImage = req.file.filename;
    }
    data.usrPassword = bcrypt.hashSync(req.body.usrPassword, 10);
    data.roleId = role.id;

    console.log("Data", data);

    const user = await User.create(data);
    user.save();
    if (!user) return res.status(404, "User can not register");

    res.json(apiResponse(user, true, "User register successfully"));
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { usrEmail, usrPassword } = req.body;
    const user = await User.findOne({
      where: { usrEmail },
      include: [{ model: Role, as: "role" }],
    });

    if (!user)
      return res.json(apiResponse(null, false, "User does  not found"));

    const isValid = bcrypt.compareSync(usrPassword, user.usrPassword);

    if (!isValid)
      return res.json(apiResponse(null, false, "Password does not match"));

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
    res.json({
      result: {
        user: user,
        token: token,
      },
      status: true,
      msg: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
