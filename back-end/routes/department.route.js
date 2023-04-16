import express from "express";
import {
  createRoles,
  deleteRole,
  getAllRoles,
  getRolesById,
  updateRoleById,
} from "../controllers/role.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { create, deleteById, getAlls, getById, updateById } from "../controllers/department.controller.js";
import { departmentValidator } from "../validators/department.validator.js";

const router = express.Router();
router.route("/")
  .get(getAlls)
  .post(departmentValidator, create);

router.route("/:id")
  .get(getById)
  .delete(deleteById)
  .put(departmentValidator, updateById);

export default router;
