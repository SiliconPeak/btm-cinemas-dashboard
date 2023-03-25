import { deleteImage } from "../helpers/functions.js";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";


//User List
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.findAll({ include: [{ model: Role, as: "role" }] });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//User Find by Id
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, { include: [{ model: Role, as: "role" }] });

    if (!user) return res.status(403).json({ msg: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

//Delete User by id
export const deleteUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(403).json({ msg: "User not found" });
    await user.destroy();
    deleteImage(user.profileImage);
    res.status(200).json({ msg: "User has been deleted" });

  } catch (error) {
    console.log(error);
  }
}

//Update users
export const updateUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(403).json({ msg: "User does not found" });

    if (req.file) {
      data.profileImage = req.file.filename;
    }
    const dataMap = {
      usrName: data.usrName,
      usrEmail: data.usrEmail,
      status: data.status,
      profileImage: data.profileImage,
      roleId: data.roleId
    }
    await User.update(dataMap, { where: { id: user.id } });
    deleteImage(user.profileImage);
    res.status(200).json({ msg: "User has been updated" });

  } catch (error) {
    console.log(error);
  }
}