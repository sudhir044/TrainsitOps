import { body } from "express-validator";

export const createFuelValidator = [

    body("vehicle_id")
        .isInt()
        .withMessage("Vehicle is required"),

    body("liters")
        .isFloat({ gt: 0 })
        .withMessage("Fuel quantity must be greater than 0"),

    body("fuel_cost")
        .isFloat({ gt: 0 })
        .withMessage("Fuel cost must be greater than 0"),

    body("fuel_date")
        .optional()
        .isISO8601()
        .withMessage("Invalid fuel date")

];