import { body } from "express-validator";

export const createMaintenanceValidator = [
    body("vehicle_id")
        .isInt()
        .withMessage("Vehicle ID is required"),

    body("issue")
        .trim()
        .notEmpty()
        .withMessage("Issue is required"),

    body("description")
        .optional()
        .trim(),

    body("cost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cost must be a positive number"),
];