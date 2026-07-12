import express from "express";

import {
    summaryReportController,
    tripReportController,
    fuelReportController,
    expenseReportController,
    maintenanceReportController,
    driverReportController,
} from "../controllers/report.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/summary", authenticate, summaryReportController);

router.get("/trips", authenticate, tripReportController);

router.get("/fuel", authenticate, fuelReportController);

router.get("/expenses", authenticate, expenseReportController);

router.get("/maintenance", authenticate, maintenanceReportController);

router.get("/drivers", authenticate, driverReportController);

export default router;