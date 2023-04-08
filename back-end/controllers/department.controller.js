import { apiErrorResponse, apiSuccessResponse, apiListResponse } from "../helpers/functions.js";
import { MESSAGE } from "../helpers/response.message.js";
import { Department } from "../models/department.model.js";



//Department List
export const getAlls = async (req, res, next) => {
  try {
    let department = await Department.findAll();
    if (!department) return res.status(404).json(apiErrorResponse(404, MESSAGE.DEPARTMENT_NOT_FOUND));
    res.status(200).json(apiListResponse(200, department, MESSAGE.DEPARTMENT_FETCH));
  } catch (error) {
    console.log(error);
  }
};

//Department Find By Id
export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let department = await Department.findByPk(id, {
      //include: [{ model: Person, as: "person" }],
    });
    if (!department) return res.status(404).json(apiErrorResponse(404, MESSAGE.DEPARTMENT_NOT_FOUND));
    res.status(200).json(apiListResponse(200, department, MESSAGE.DEPARTMENT_FETCH));
  } catch (error) {
    console.log(error);
  }
};

//Create Departments
export const create = async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const data = {
      title: title,
      status: status,
    };

    const checkDepartment = await Department.findOne({ where: { title } });
    if (checkDepartment) return res.status(409).json(apiErrorResponse(409, MESSAGE.DEPARTMENT_DUPLICATE));
    const department = await Department.create(data);
    await department.save(department);
    res.status(200).json(apiSuccessResponse(200, MESSAGE.DEPARTMENT_ADD));
  } catch (error) {
    console.log(error);
  }
};

//Update Departments
export const updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, status } = req.body;
    const data = {
      title: title,
      status: status
    }
    const department = await Department.findByPk(id);
    if (!department) return res.status(404).json(apiErrorResponse(404, MESSAGE.DEPARTMENT_NOT_FOUND));

    const checkDepartment = await Department.findOne({ where: { title } });
    if (checkDepartment) return res.status(409).json(apiErrorResponse(409, MESSAGE.DEPARTMENT_DUPLICATE));

    const departmentResponse = await Department.update(data, { where: { id: department.id } });

    if (!departmentResponse) return res.status(404).json(apiErrorResponse(404, MESSAGE.DEPARTMENT_NOT_UPDATE));
    res.status(200).json(apiSuccessResponse(200, MESSAGE.DEPARTMENT_UPDATE));
  } catch (error) {
    console.log(error);
  }
};

//Delete department
export const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const department = await Department.findByPk(id);

    if (!department) return res.status(404).json(apiErrorResponse(404, MESSAGE.DEPARTMENT_NOT_FOUND));
    await department.destroy();
    res.status(200).json(apiSuccessResponse(200, MESSAGE.DEPARTMENT_DELETE));
  } catch (error) {
    console.log(error);
  }
};
