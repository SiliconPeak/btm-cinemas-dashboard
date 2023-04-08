import { apiErrorResponse, apiSuccessResponse, apiListResponse } from "../helpers/functions.js";
import { MESSAGE } from "../helpers/response.message.js";
import { MovieRole } from "../models/movie-role.model.js";


//Role List
export const getAlls = async (req, res, next) => {
  try {
    // let role = await Role.findAll({ include: [{ model: User, as: "user" }] });
    let role = await MovieRole.findAll();
    if (!role) return res.status(404).json(apiErrorResponse(404, MESSAGE.ROLE_NOT));
    res.status(200).json(apiListResponse(200, role, MESSAGE.ROLE));
  } catch (error) {
    console.log(error);
  }
};

//Role Find By  Id
export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let role = await MovieRole.findByPk(id, {
      //include: [{ model: User, as: "user" }],
    });
    if (!role) return res.status(404).json(apiErrorResponse(404, MESSAGE.ROLE_NOT));
    res.status(200).json(apiListResponse(200, role, MESSAGE.ROLE));
  } catch (error) {
    console.log(error);
  }
};

//Create MovieRoles
export const create = async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const data = {
      title: title,
      status: status,
    };

    const checkRole = await MovieRole.findOne({ where: { title } });
    if (checkRole) return res.status(409).json(apiErrorResponse(409, MESSAGE.ROLE_DUPLICATE));
    const role = await MovieRole.create(data);
    await role.save(role);
    res.status(200).json(apiSuccessResponse(200, MESSAGE.ROLE_ADD));
  } catch (error) {
    console.log(error);
  }
};

//Update MovieRoles
export const updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, status } = req.body;
    const data = {
      title: title,
      status: status
    }
    const roleById = await MovieRole.findByPk(id);
    if (!roleById) return res.status(404).json(apiErrorResponse(404, MESSAGE.ROLE_NOT));

    const checkRole = await MovieRole.findOne({ where: { title } });
    if (checkRole) return res.status(409).json(apiErrorResponse(409, MESSAGE.ROLE_DUPLICATE));

    const role = await MovieRole.update(data, { where: { id: roleById.id } });

    if (!role) return res.status(404).json(apiErrorResponse(404, MESSAGE.ROLE_NOT_UPDATE));
    res.status(200).json(apiSuccessResponse(200, MESSAGE.ROLE_UPDATE));
  } catch (error) {
    console.log(error);
  }
};

//Delete role
export const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await MovieRole.findByPk(id);

    if (!role) return res.status(404).json(apiErrorResponse(404, MESSAGE.ROLE_NOT));
    await role.destroy();
    res.status(200).json(apiSuccessResponse(200, MESSAGE.ROLE_DELETE));
  } catch (error) {
    console.log(error);
  }
};
