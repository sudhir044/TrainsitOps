import { validationResult } from "express-validator";

import {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
} from "../services/expense.service.js";

export const createExpenseController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const expense = await createExpense(req.body);

        res.status(201).json({
            success: true,
            data: expense,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllExpenses = async (req, res) => {
    const expenses = await getExpenses();

    res.json({
        success: true,
        count: expenses.length,
        data: expenses,
    });
};

export const getExpense = async (req, res) => {
    const expense = await getExpenseById(req.params.id);

    if (!expense) {
        return res.status(404).json({
            success: false,
            message: "Expense not found",
        });
    }

    res.json({
        success: true,
        data: expense,
    });
};

export const updateExpenseController = async (req, res) => {
    const expense = await updateExpense(req.params.id, req.body);

    res.json({
        success: true,
        message: "Expense updated",
        data: expense,
    });
};

export const deleteExpenseController = async (req, res) => {
    await deleteExpense(req.params.id);

    res.json({
        success: true,
        message: "Expense deleted",
    });
};