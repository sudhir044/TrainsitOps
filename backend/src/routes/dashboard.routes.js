import express from "express";

import {
    overviewController,
    kpiController,
    recentTripsController,
    vehicleStatusChartController,
    fleetUtilizationChartController,
    expenseChartController,
    recentActivitiesController,
} from "../controllers/dashboard.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Dashboard Overview
router.get(
    "/overview",
    authenticate,
    overviewController
);

// KPI Cards
router.get(
    "/kpis",
    authenticate,
    kpiController
);

// Recent Trips
router.get(
    "/recent-trips",
    authenticate,
    recentTripsController
);

// Vehicle Status Chart
router.get(
    "/vehicle-status",
    authenticate,
    vehicleStatusChartController
);

// Fleet Utilization Chart
router.get(
    "/fleet-utilization",
    authenticate,
    fleetUtilizationChartController
);

// Expense Chart
router.get(
    "/expense-chart",
    authenticate,
    expenseChartController
);

// Recent Activities
router.get(
    "/recent-activities",
    authenticate,
    recentActivitiesController
);

export default router;