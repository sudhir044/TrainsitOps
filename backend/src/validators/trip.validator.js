import { body } from "express-validator";

export const createTripValidator = [

    body("vehicle_id")
        .isInt()
        .withMessage("Vehicle is required"),

    body("driver_id")
        .isInt()
        .withMessage("Driver is required"),

    body("source")
        .trim()
        .notEmpty()
        .withMessage("Source is required"),

    body("destination")
        .trim()
        .notEmpty()
        .withMessage("Destination is required"),

    body("cargo_weight")
        .isFloat({ gt: 0 })
        .withMessage("Invalid cargo weight"),

    body("planned_distance")
        .isFloat({ gt: 0 })
        .withMessage("Invalid planned distance"),

    body("dispatch_date")
        .optional()
        .isISO8601(),

    body("route_notes")
        .optional()
        .trim()

];