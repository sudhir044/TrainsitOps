import { body } from "express-validator";

export const createExpenseValidator = [
    body("vehicle_id")
        .isInt()
        .withMessage("Vehicle is required"),

    body("expense_type")
        .isIn([
            "Insurance",
            "Toll",
            "Parking",
            "Other",
        ])
        .withMessage("Invalid expense type"),

    body("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than 0"),

    body("description")
        .optional()
        .trim(),

    body("expense_date")
        .optional()
        .isISO8601()
        .withMessage("Invalid expense date"),
];