import { apiResponse } from "../helpers/functions.js";
import { Role } from "../models/role.model.js";

export const getAllRoles = async (req, res, next) => {
  try {
    let role = await Role.findAll();
    if (!role) return res.json(404, "Role not found");
    res.json(apiResponse(role, true, "Role fetched"));
  } catch (error) {
    console.log(error);
  }
};
