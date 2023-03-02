import express from "express";
import { registraterUser } from "../controllers/auth.controller.js";
import { registraterValidator } from "../validators/user.validator.js";
import { uploader } from "../middlewares/upload.middleware.js";

const router = express.Router();
router.post(
  "/register",
  uploader.single("profileImage"),
  registraterValidator,
  registraterUser
);
export default router;
