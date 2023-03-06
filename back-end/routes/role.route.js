import express from "express";
import {
  createRoles,
  deleteRole,
  getAllRoles,
  getRolesById,
  updateRoleById,
} from "../controllers/role.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route("/")
  .get(authCheck, getAllRoles)
  .post(authCheck, createRoles);

router.route("/:id")
  .get(authCheck, getRolesById)
  .delete(authCheck, deleteRole)
  .put(authCheck, updateRoleById);

export default router;
