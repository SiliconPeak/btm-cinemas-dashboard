import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").delete();
export default router;
