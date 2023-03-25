import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

//Role List
export const getAllRoles = async (req, res, next) => {
  try {
    let role = await Role.findAll({ include: [{ model: User, as: "user" }] });
    if (!role) return res.status(404).json("Role not found");
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
  }
};

//Role Find By  Id
export const getRolesById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let role = await Role.findByPk(id, {
      include: [{ model: User, as: "user" }],
    });
    if (!role) return res.status(404).json({ msg: "Role not found" });
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
  }
};

//Create Roles
export const createRoles = async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const data = {
      title: title,
      status: status,
    };
    const role = await Role.create(data);
    await role.save(role);
    res.status(200).json({ msg: "Role has been created" });
  } catch (error) {
    console.log(error);
  }
};

//Update Roles
export const updateRoleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, status } = req.body;
    const data = {
      title: title,
      status: status
    }
    const roleById = await Role.findByPk(id);
    if (!roleById) return req.status(404).json({ msg: "Role does not found" });

    const role = await Role.update(data, { where: { id: roleById.id } });
    if (!role) return res.status(404).json({ msg: "Role does not update" });
    res.status(200).json({ msg: "Role has been updated" });
  } catch (error) {
    console.log(error);
  }
};

//Delete role
export const deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await Role.findByPk(id);

    if (!role) return res.status(404).json({ msg: "Role does not found" });
    await role.destroy();
    res.status(200).json({ msg: "Role has been deleted" });
  } catch (error) {
    console.log(error);
  }
};
