import express from "express";
import { createGeners, deleteGenres, getAllGenres, getGenresById, updateGenresById } from "../controllers/genres.controller.js";

const router = express.Router();
router.route("/")
    .get(getAllGenres)
    .post(createGeners);

router.route("/:id")
    .get(getGenresById)
    .put(updateGenresById)
    .delete(deleteGenres);

export default router;