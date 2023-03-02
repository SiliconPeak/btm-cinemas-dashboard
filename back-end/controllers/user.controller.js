import { apiResponse } from "../helpers/functions.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json(apiResponse(user, true, "User fetched"));
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) return res.json(404, "User not found");

    res.json(apiResponse(user, true, "User fetched"));
  } catch (error) {
    console.log(error);
  }
};
