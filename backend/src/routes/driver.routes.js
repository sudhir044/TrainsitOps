import express from "express";

import {
    createDriver,
    getDrivers,
    getDriver,
    updateDriverController,
    deleteDriverController,
} from "../controllers/driver.controller.js";

import { createDriverValidator } from "../validators/driver.validator.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("Fleet Manager"),
    createDriverValidator,
    createDriver
);

router.get("/", authenticate, getDrivers);

router.get("/:id", authenticate, getDriver);

router.put(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    createDriverValidator,
    updateDriverController
);

router.delete(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    deleteDriverController
);

export default router;