import { apiResponse } from "../helpers/functions.js";

export const getAllUsers = async (req, res, next) => {
  try {
    res.json(apiResponse("User data", true, "User fetched"));
  } catch (error) {
    next(error);
  }
};
