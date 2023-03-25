import express from "express";
import { deleteUsers, getAllUsers, getUserById, updateUsers } from "../controllers/user.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { userUpdateValidator } from "../validators/user.validator.js";
import { uploader } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.route("/")
    .get(authCheck, getAllUsers);
router.route("/:id")
    .get(authCheck, getUserById)
    .delete(authCheck, deleteUsers)
    .put(authCheck, uploader.single("profileImage"),
        userUpdateValidator, updateUsers);

export default router;
