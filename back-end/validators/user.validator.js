import { body, check } from "express-validator";

export const registraterValidator = [
  body("usrName").default(undefined),
  body("usrEmail").default(undefined),
  body("usrPassword").default(undefined),
  body("status").default(undefined),
  body("roleId").default(undefined),

  check("usrName", "Name is required")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 32 })
    .withMessage("Name must be between 3 to 32 characters"),
  check("usrEmail", "Enter valid email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Must be valid email address"),
  check("usrPassword", "Enter valid password")
    .trim()
    .notEmpty()
    .matches("")
    .matches(/(?=.*[0-9])/)
    .isLength({ min: 6 })
    .withMessage("Password must content 6 letters with a character and number"),

  check("roleId", "Role is required").trim().notEmpty(),
  check("status", "Status is required").trim().notEmpty(),
];
