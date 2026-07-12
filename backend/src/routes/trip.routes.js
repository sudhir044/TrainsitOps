import express from "express";

import {
    createTrip,
    getAllTrips,
    getTrip,
    dispatchTripController,
    completeTripController,
    deleteTripController,
} from "../controllers/trip.controller.js";

import { createTripValidator } from "../validators/trip.validator.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Create Trip
router.post(
    "/",
    authenticate,
    authorize("Fleet Manager"),
    createTripValidator,
    createTrip
);

// Get All Trips
router.get("/", authenticate, getAllTrips);

// Get Single Trip
router.get("/:id", authenticate, getTrip);

// Dispatch Trip
router.patch(
    "/:id/dispatch",
    authenticate,
    authorize("Fleet Manager"),
    dispatchTripController
);

// Complete Trip
router.patch(
    "/:id/complete",
    authenticate,
    authorize("Fleet Manager", "Driver"),
    completeTripController
);

// Delete Trip
router.delete(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    deleteTripController
);

export default router;