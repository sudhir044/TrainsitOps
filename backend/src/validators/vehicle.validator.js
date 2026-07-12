import { body } from "express-validator";

export const createVehicleValidator = [
    body("registration_number")
        .trim()
        .notEmpty()
        .withMessage("Registration number is required"),

    body("vehicle_name")
        .optional()
        .trim(),

    body("model")
        .optional()
        .trim(),

    body("vehicle_type")
        .optional()
        .trim(),

    body("capacity")
        .isFloat({ min: 0 })
        .withMessage("Capacity must be a positive number"),

    body("odometer")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Odometer must be a non-negative integer"),

    body("acquisition_cost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Acquisition cost must be a positive number"),

    body("status")
        .optional()
        .isIn(["Available", "On Trip", "In Shop", "Retired"])
        .withMessage("Invalid status value"),
];
