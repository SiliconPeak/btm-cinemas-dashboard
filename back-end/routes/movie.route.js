import express from "express";
import { uploader } from "../middlewares/upload.middleware.js";
import { create, deleteById, getAlls, getById, updateById } from "../controllers/movie.controller.js";
import { movieValidator } from "../validators/movie.validator.js";

const router = express.Router();

router.route("/")
    .get(getAlls)
    .post(movieValidator, uploader.single("posterUrl"), create);
router.route("/:id")
    .get(getById)
    .delete(deleteById)
    .put(uploader.single("posterUrl"), updateById);

export default router;
