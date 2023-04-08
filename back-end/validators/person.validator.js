import { body, check } from "express-validator";

export const personsValidator = [
  body("name").default(undefined),
  body("gender").default(undefined),
  body("birthday").default(undefined),
  body("status").default(undefined),
  check("name", "Name is required")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 32 })
    .withMessage("Name must be between 3 to 32 characters"),

  check("gender", "Gender is required").trim().notEmpty().withMessage("Gender is require"),
  check("birthday").trim().isISO8601().toDate().withMessage("Invalid date format"),
  check("status", "Status is required").trim().notEmpty().withMessage("Status is required"),
];


