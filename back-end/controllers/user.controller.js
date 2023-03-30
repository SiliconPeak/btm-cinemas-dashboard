import { apiErrorResponse, apiListResponse, apiSuccessResponse, deleteImage } from "../helpers/functions.js";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import { MESSAGE } from "../helpers/response.message.js";


//User List
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.findAll({ include: [{ model: Role, as: "role" }] });
    if (!user) return res.status(404).json(apiErrorResponse(404, MESSAGE.USER_NOT));
    res.status(200).json(apiListResponse(200, user, MESSAGE.USER));
  } catch (error) {
    next(error);
  }
};

//User Find by Id
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, { include: [{ model: Role, as: "role" }] });

    if (!user) return res.status(404).json(apiErrorResponse(404, MESSAGE.USER_NOT));

    res.status(200).json(apiListResponse(200, user, MESSAGE.USER));
  } catch (error) {
    console.log(error);
  }
};

//Delete User by id
export const deleteUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json(apiErrorResponse(404, MESSAGE.USER_NOT));
    await user.destroy();
    deleteImage(user.profileImage);
    res.status(200).json(apiSuccessResponse(200, MESSAGE.USER_DELETE));

  } catch (error) {
    console.log(error);
  }
}

//Update users
export const updateUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("Data:", data);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json(apiErrorResponse(404, MESSAGE.USER_NOT));

    if (req.file) {
      data.profileImage = req.file.filename;
    }

    const dataMap = {
      usrName: data.usrName,
      status: data.status,
      // email: data.email,
      //profileImage: data.profileImage,
      roleId: parseInt(data.roleId)
    }

    await User.update(dataMap, { where: { id: user.id } });

    if (user.profileImage && req.file) {
      deleteImage(user.profileImage);
    }


    res.status(200).json(apiSuccessResponse(200, MESSAGE.USER_UPDATE));

  } catch (error) {
    console.log(error);
  }
}