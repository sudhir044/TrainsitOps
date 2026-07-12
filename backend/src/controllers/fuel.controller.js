import { validationResult } from "express-validator";

import {
    createFuelLog,
    getFuelLogs,
    getFuelLogById,
    updateFuelLog,
    deleteFuelLog
} from "../services/fuel.service.js";

export const createFuel = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const fuel = await createFuelLog(req.body);

        res.status(201).json({
            success: true,
            data: fuel
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const getAllFuel = async (req, res) => {

    const fuel = await getFuelLogs();

    res.json({
        success: true,
        count: fuel.length,
        data: fuel
    });

};

export const getFuel = async (req, res) => {

    const fuel = await getFuelLogById(req.params.id);

    res.json({
        success: true,
        data: fuel
    });

};

export const updateFuel = async (req, res) => {

    const fuel = await updateFuelLog(req.params.id, req.body);

    res.json({
        success: true,
        message: "Fuel log updated",
        data: fuel
    });

};

export const deleteFuel = async (req, res) => {

    await deleteFuelLog(req.params.id);

    res.json({
        success: true,
        message: "Fuel log deleted"
    });

};