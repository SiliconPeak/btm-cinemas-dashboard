import { apiErrorResponse, apiListResponse, apiSuccessResponse } from "../helpers/functions.js";
import { MESSAGE } from "../helpers/response.message.js";
import { Genres } from "../models/genres.model.js";

//Genres List
export const getAllGenres = async (req, res, next) => {
    try {
        const geners = await Genres.findAll();

        if (!geners) return res.status(404).json(apiErrorResponse(404, MESSAGE.GENRES_NOT_FOUND));
        res.status(200).json(apiListResponse(200, geners, MESSAGE.GENRES_FETCH));

    } catch (error) {
        console.log(error);
    }
}
//Genres find by id
export const getGenresById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const geners = await Genres.findByPk(id);
        if (!geners) return res.status(404).json(apiErrorResponse(404, MESSAGE.GENRES_NOT_FOUND));
        res.status(200).json(apiListResponse(200, geners, MESSAGE.GENRES_FETCH));
    } catch (error) {
        console.log(error);
    }
}

//Create genres
export const createGeners = async (req, res, next) => {
    try {
        const { name, status } = req.body;
        const data = {
            name: name,
            status: status
        };

        const checkGenres = await Genres.findOne({ where: { name } });
        if (checkGenres) return res.status(409).json(apiErrorResponse(409, MESSAGE.GENRES_DUPLICATE));

        const geners = await Genres.create(data);
        await geners.save(geners);
        res.status(200).json(apiSuccessResponse(200, MESSAGE.GENRES_ADD));

    } catch (error) {
        console.log(error);
    }
}

//Update Genres
export const updateGenresById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, status } = req.body;
        const data = {
            name: name,
            status: status
        };

        const getGenres = await Genres.findByPk(id);
        if (!getGenres) return res.status(404).json(apiErrorResponse(404, MESSAGE.GENRES_NOT_FOUND));

        const checkGenres = await Genres.findOne({ where: { name } });
        if (checkGenres) return res.status(409).json(apiErrorResponse(409, MESSAGE.GENRES_DUPLICATE));

        const genres = await Genres.update(data, { where: { id: getGenres.id } });
        if (!genres) return res.status(404).json(apiErrorResponse(404, MESSAGE.GENRES_NOT_UPDATE));
        res.status(200).json(apiSuccessResponse(200, MESSAGE.GENRES_UPDATE));

    } catch (error) {
        console.log(error);
    }
}

//Delete genres
export const deleteGenres = async (req, res, next) => {
    try {
        const id = req.params.id;
        const genres = await Genres.findByPk(id);

        if (!genres) return res.status(404).json(apiErrorResponse(404, MESSAGE.GENRES_NOT_FOUND));
        await genres.destroy();
        res.status(200).json(apiSuccessResponse(200, MESSAGE.GENRES_DELETE));
    } catch (error) {
        console.log(error);
    }
}
