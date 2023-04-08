import { body, check } from "express-validator";
export const departmentValidator = [
  body("title").default(undefined),
  body("status").default(undefined),

  check("title", "Title is required").trim().notEmpty(),
  check("status").trim().notEmpty(),
];
