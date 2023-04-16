import express from "express";
import {
  create,
  deleteById,
  getAlls,
  getById,
  updateById,

} from "../controllers/movie-role.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route("/")
  .get(getAlls)
  .post(create);

router.route("/:id")
  .get(getById)
  .delete(deleteById)
  .put(updateById);

export default router;
