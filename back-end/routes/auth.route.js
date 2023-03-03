import express from "express";
import { loginUser, registraterUser } from "../controllers/auth.controller.js";
import { registraterValidator } from "../validators/user.validator.js";
import { uploader } from "../middlewares/upload.middleware.js";

const router = express.Router();
router.post(
  "/register",
  uploader.single("profileImage"),
  registraterValidator,
  registraterUser
);
router.post("/login", loginUser);
export default router;
