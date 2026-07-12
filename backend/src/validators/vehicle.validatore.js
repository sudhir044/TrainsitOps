import { body } from "express-validator";

export const createVehicleValidator = [
  body("registration_number")
    .trim()
    .notEmpty()
    .withMessage("Registration number is required"),

  body("vehicle_name")
    .trim()
    .notEmpty()
    .withMessage("Vehicle name is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),

  body("vehicle_type")
    .trim()
    .notEmpty()
    .withMessage("Vehicle type is required"),

  body("capacity")
    .isFloat({ gt: 0 })
    .withMessage("Capacity must be greater than 0"),

  body("odometer")
    .optional()
    .isInt({ min: 0 }),

  body("acquisition_cost")
    .optional()
    .isFloat({ min: 0 }),

  body("status")
    .optional()
    .isIn([
      "Available",
      "On Trip",
      "In Shop",
      "Retired"
    ])
];