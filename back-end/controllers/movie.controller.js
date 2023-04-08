import { apiErrorResponse, apiListResponse, apiSuccessResponse, deleteImage } from "../helpers/functions.js";
import { Movies } from "../models/movie.model.js";
import { MESSAGE } from "../helpers/response.message.js";
import { Genres } from "../models/genres.model.js";


//Movies List
export const getAlls = async (req, res, next) => {
  try {
    const movie = await Movies.findAll({ include: [{ model: Genres, as: 'gener' }] });
    if (!movie) return res.status(404).json(apiErrorResponse(404, MESSAGE.MOVIE_NOT_FOUND));
    res.status(200).json(apiListResponse(200, movie, MESSAGE.MOVIE_FETCH));
  } catch (error) {
    next(error);
  }
};

//Movies Find by Id
export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movies.findOne({
      where: { id: id },
      include: [{ model: Genres, as: "gener" }]
    });

    if (!movie) return res.status(404).json(apiErrorResponse(404, MESSAGE.MOVIE_ROLE_NOT_FOUND));

    res.status(200).json(apiListResponse(200, movie, MESSAGE.MOVIE_FETCH));
  } catch (error) {
    console.log(error);
  }
};

//Add new movie
export const create = async (req, res, next) => {
  try {
    const data = req.body;
    const gener = await Genres.findByPk(data.generId);
    if (!gener) {
      return res.json(apiErrorResponse(404, MESSAGE.GENRES_NOT_FOUND));
    }

    if (req.file) {
      data.posterUrl = req.file.filename;
    }

    data.generId = gener.id;
    const movie = await Movies.create(data);
    movie.save();
    if (!movie) return res.status(404).json(apiErrorResponse(404, MESSAGE.MOVIE_ADD_ERROR));

    res.status(200).json(apiSuccessResponse(200, MESSAGE.MOVIE_ADD));
  } catch (error) {
    console.log(error);
  }
};
//Delete Movies by id
export const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movies.findByPk(id);
    if (!movie) return res.status(404).json(apiErrorResponse(404, MESSAGE.MOVIE_NOT_FOUND));
    const movieResponse = await movie.destroy();
    if (!movieResponse) return res.status(404).json(apiErrorResponse(404, MESSAGE.MOVIE_NOT_DELETE));

    if (movie.posterUrl && req.file) {
      deleteImage(movie.posterUrl);
    }
    res.status(200).json(apiSuccessResponse(200, MESSAGE.MOVIE_DELETE));

  } catch (error) {
    console.log(error);
  }
}

//Update movies
export const updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const movie = await Movies.findByPk(id);
    if (!movie) return res.status(404).json(apiErrorResponse(404, MESSAGE.MOVIE_NOT_FOUND));

    if (req.file) {
      data.posterUrl = req.file.filename;
    }

    const gener = Genres.findByPk(data.generId);

    data.generId = gener.id;
    const movieResponse = await Movies.update(data, { where: { id: movie.id } });

    if (!movieResponse) return res.status(404).json(apiErrorResponse(404, MESSAGE.MOVIE_NOT_UPDATE));

    if (movie.posterUrl && req.file) {
      deleteImage(movie.posterUrl);
    }

    res.status(200).json(apiSuccessResponse(200, MESSAGE.MOVIE_UPDATE));

  } catch (error) {
    console.log(error);
  }
}