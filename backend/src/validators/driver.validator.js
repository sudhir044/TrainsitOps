import { body } from "express-validator";

export const createDriverValidator = [
    body("user_id")
        .isInt()
        .withMessage("User ID is required"),

    body("license_number")
        .trim()
        .notEmpty()
        .withMessage("License number is required"),

    body("license_category")
        .trim()
        .notEmpty()
        .withMessage("License category is required"),

    body("expiry_date")
        .isDate()
        .withMessage("Valid expiry date is required"),

    body("safety_score")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Safety score must be between 0 and 100"),

    body("status")
        .optional()
        .isIn([
            "Available",
            "On Trip",
            "Off Duty",
            "Suspended"
        ])
];