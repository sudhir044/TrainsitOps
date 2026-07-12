import express from "express";

import {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicleController,
    deleteVehicleController,
} from "../controllers/vehicle.controller.js";

import { createVehicleValidator } from "../validators/vehicle.validator.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("Fleet Manager"),
    createVehicleValidator,
    createVehicle
);

router.get("/", authenticate, getVehicles);

router.get("/:id", authenticate, getVehicle);

router.put(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    createVehicleValidator,
    updateVehicleController
);

router.delete(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    deleteVehicleController
);

export default router;