import express from "express";

import {
    createMaintenanceController,
    getAllMaintenances,
    getMaintenance,
    startMaintenanceController,
    completeMaintenanceController,
    deleteMaintenanceController,
} from "../controllers/maintenance.controller.js";

import { createMaintenanceValidator } from "../validators/maintenance.validator.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("Fleet Manager"),
    createMaintenanceValidator,
    createMaintenanceController
);

router.get("/", authenticate, getAllMaintenances);

router.get("/:id", authenticate, getMaintenance);

router.patch(
    "/:id/start",
    authenticate,
    authorize("Fleet Manager"),
    startMaintenanceController
);

router.patch(
    "/:id/complete",
    authenticate,
    authorize("Fleet Manager"),
    completeMaintenanceController
);

router.delete(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    deleteMaintenanceController
);

export default router;