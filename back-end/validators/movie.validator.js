import { body, check } from "express-validator";

export const movieValidator = [
  body("name").default(undefined),
  body("adults").default(undefined),
  body("overview").default(undefined),
  body("releaseDate").default(undefined),
  body("language").default(undefined),
  body("duration").default(undefined),
  body("status").default(undefined),

  check("name").trim().notEmpty().withMessage("Name is required"),
  check("adults").trim().notEmpty().withMessage("Adult is required"),

  check("overview", "Overview is required").trim().notEmpty().withMessage("Overview is require"),
  check("language", "Language is required").trim().notEmpty().withMessage("Language is require"),
  check("duration", "Duration is required").trim().notEmpty().withMessage("Duration is require"),
  check("releaseDate").trim().isISO8601().toDate().withMessage("Invalid date format"),
  check("status", "Status is required").trim().notEmpty().withMessage("Status is required"),
];


