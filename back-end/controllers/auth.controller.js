import { Role } from "../models/role.model.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { apiResponse } from "../helpers/functions.js";

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
