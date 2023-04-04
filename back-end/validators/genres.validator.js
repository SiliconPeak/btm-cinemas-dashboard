import { body, check } from "express-validator";

export const genersValidator = [
    body("name").default(undefined),
    body("status").default(undefined),

    check("name", "Name is required").trim().notEmpty(),
    check("status", "Status is required").trim().notEmpty(),
]