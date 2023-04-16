import { apiErrorResponse, apiListResponse, apiSuccessResponse, deleteImage } from "../helpers/functions.js";
import { Person } from "../models/person.model.js";
import { MESSAGE } from "../helpers/response.message.js";
import { Department } from "../models/department.model.js";
import { MovieRole } from "../models/movie-role.model.js";

//Person List
export const getAlls = async (req, res, next) => {
  try {
    const person = await Person.findAll();
    if (!person) return res.status(404).json(apiErrorResponse(404, MESSAGE.PERSON_NOT_FOUND));
    res.status(200).json(apiListResponse(200, person, MESSAGE.PERSON_FETCH));
  } catch (error) {
    next(error);
  }
};

//Person Find by Id
export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await Person.findOne({
      where: { id: id },
      //include: [{ model: Department, as: "department" }]
    });

    if (!person) return res.status(404).json(apiErrorResponse(404, MESSAGE.PERSON_NOT_FOUND));

    res.status(200).json(apiListResponse(200, person, MESSAGE.PERSON_FETCH));
  } catch (error) {
    console.log(error);
  }
};

//Add new prrson
export const create = async (req, res, next) => {
  try {
    const data = req.body;
    const role = await MovieRole.findByPk(data.roleId);
    if (!role) {
      return res.json(apiErrorResponse(404, MESSAGE.MOVIE_ROLE_NOT_FOUND));
    }

    const department = await Department.findByPk(data.departmentId)
    if (!department) {
      return res.json(apiErrorResponse(404, MESSAGE.DEPARTMENT_NOT_FOUND));
    }

    if (req.file) {
      data.profileImage = req.file.filename;
    }


    data.roleId = role.id;
    data.departmentId = department.id;

    const person = await Person.create(data);
    person.save();
    if (!person) return res.status(404).json(apiErrorResponse(404, MESSAGE.PERSON_ADD_ERROR));

    res.status(200).json(apiSuccessResponse(200, MESSAGE.PERSON_ADD));
  } catch (error) {
    console.log(error);
  }
};
//Delete Person by id
export const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await Person.findByPk(id);
    if (!person) return res.status(404).json(apiErrorResponse(404, MESSAGE.PERSON_NOT_FOUND));
    const personResponse = await person.destroy();
    if (!personResponse) return res.status(404).json(apiErrorResponse(404, MESSAGE.PERSON_NOT_DELETE));
    if (person.profileImage && req.file) {
      deleteImage(person.profileImage);
    }
    res.status(200).json(apiSuccessResponse(200, MESSAGE.PERSON_DELETE));

  } catch (error) {
    console.log(error);
  }
}

//Update persons
export const updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const person = await Person.findByPk(id);
    if (!person) return res.status(404).json(apiErrorResponse(404, MESSAGE.PERSON_NOT_FOUND));

    if (req.file) {
      data.profileImage = req.file.filename;
    }

    const role = MovieRole.findOne();
    const department = Department.findOne();

    data.roleId = role.id;
    data.deleteById = department.id;

    const personResponse = await Person.update(data, { where: { id: person.id } });
    if (!personResponse) return res.status(404).json(apiErrorResponse(404, MESSAGE.DEPARTMENT_NOT_UPDATE));

    if (person.profileImage && req.file) {
      deleteImage(person.profileImage);
    }

    res.status(200).json(apiSuccessResponse(200, MESSAGE.PERSON_UPDATE));

  } catch (error) {
    console.log(error);
  }
}