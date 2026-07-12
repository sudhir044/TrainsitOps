import express from "express";

import {
    createExpenseController,
    getAllExpenses,
    getExpense,
    updateExpenseController,
    deleteExpenseController,
} from "../controllers/expense.controller.js";

import { createExpenseValidator } from "../validators/expense.validator.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("Fleet Manager"),
    createExpenseValidator,
    createExpenseController
);

router.get("/", authenticate, getAllExpenses);

router.get("/:id", authenticate, getExpense);

router.put(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    createExpenseValidator,
    updateExpenseController
);

router.delete(
    "/:id",
    authenticate,
    authorize("Fleet Manager"),
    deleteExpenseController
);

export default router;