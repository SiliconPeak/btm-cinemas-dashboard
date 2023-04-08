import express from "express";
import { authCheck } from "../middlewares/auth.middleware.js";
import { uploader } from "../middlewares/upload.middleware.js";
import { create, deleteById, getAlls, getById, updateById } from "../controllers/person.controller.js";
import { personsValidator } from "../validators/person.validator.js";

const router = express.Router();

router.route("/")
    .get(getAlls)
    .post(personsValidator, uploader.single("profileImage"), create);
router.route("/:id")
    .get(getById)
    .delete(deleteById)
    .put(uploader.single("profileImage"), updateById);

export default router;
