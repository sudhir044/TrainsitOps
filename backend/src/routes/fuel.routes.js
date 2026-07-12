import express from "express";

import {
    createFuel,
    getAllFuel,
    getFuel,
    updateFuel,
    deleteFuel
} from "../controllers/fuel.controller.js";

import { createFuelValidator } from "../validators/fuel.validator.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("Fleet Manager"),
    createFuelValidator,
    createFuel
);

router.get("/", authenticate, getAllFuel);

router.get("/:id", authenticate, getFuel);

router.put(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    updateFuel
);

router.delete(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    deleteFuel
);

export default router;