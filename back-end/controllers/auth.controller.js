import { Role } from "../models/role.model.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/jwt.config.js";

export const registraterUser = async (req, res, next) => {
  try {
    const data = req.body;
    const usrEmail = data.usrEmail;
    const role = await Role.findByPk(data.roleId);
    if (!role) {
      return res.status(404).send({ msg: "Role does not found" });
    }
    const userCheck = await User.findOne({ where: { usrEmail } });
    if (userCheck) {
      return res.status(403).send({ msg: "Email already exits" });
    }
    if (req.file) {
      data.profileImage = req.file.filename;
    }
    data.usrPassword = bcrypt.hashSync(req.body.usrPassword, 10);
    data.roleId = role.id;

    const user = await User.create(data);
    user.save();
    if (!user) return res.status(404).json({ msg: "User can not register" });

    res.status(200).json({ msg: "User register successfully" });
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

    if (!user) return res.status(404).json({ msg: "User does  not found" });

    const isValid = bcrypt.compareSync(usrPassword, user.usrPassword);

    if (!isValid)
      return res.status(404).json({ msg: "Password does not match" });

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
      user: {
        id: user.id,
        name: user.usrName,
        profileImage: user.profileImage,
        email: user.usrEmail,
      },
      token: token,
      msg: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
