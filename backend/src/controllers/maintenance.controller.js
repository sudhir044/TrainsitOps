import { validationResult } from "express-validator";
import {
    createMaintenance,
    getMaintenances,
    getMaintenanceById,
    startMaintenance,
    completeMaintenance,
    deleteMaintenance,
} from "../services/maintenance.service.js";

export const createMaintenanceController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const maintenance = await createMaintenance(req.body);

        res.status(201).json({
            success: true,
            data: maintenance,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllMaintenances = async (req, res) => {
    const data = await getMaintenances();

    res.json({
        success: true,
        count: data.length,
        data,
    });
};

export const getMaintenance = async (req, res) => {
    const data = await getMaintenanceById(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Maintenance record not found",
        });
    }

    res.json({
        success: true,
        data,
    });
};

export const startMaintenanceController = async (req, res) => {
    await startMaintenance(req.params.id);

    res.json({
        success: true,
        message: "Maintenance started",
    });
};

export const completeMaintenanceController = async (req, res) => {
    await completeMaintenance(req.params.id);

    res.json({
        success: true,
        message: "Maintenance completed",
    });
};

export const deleteMaintenanceController = async (req, res) => {
    await deleteMaintenance(req.params.id);

    res.json({
        success: true,
        message: "Maintenance deleted",
    });
};