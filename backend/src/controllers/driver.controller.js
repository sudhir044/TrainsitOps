import { validationResult } from "express-validator";

import {
    getDriverByLicense,
    createDriverService,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
} from "../services/driver.service.js";

export const createDriver = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const existingDriver = await getDriverByLicense(
            req.body.license_number
        );

        if (existingDriver) {
            return res.status(409).json({
                success: false,
                message: "Driver already exists",
            });
        }

        const driver = await createDriverService(req.body);

        return res.status(201).json({
            success: true,
            message: "Driver created successfully",
            data: driver,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getDrivers = async (req, res) => {
    try {
        const drivers = await getAllDrivers();

        return res.status(200).json({
            success: true,
            count: drivers.length,
            data: drivers,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getDriver = async (req, res) => {
    try {
        const driver = await getDriverById(req.params.id);

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: driver,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateDriverController = async (req, res) => {
    try {
        const driver = await updateDriver(req.params.id, req.body);

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Driver updated successfully",
            data: driver,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const deleteDriverController = async (req, res) => {
    try {
        const driver = await getDriverById(req.params.id);

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }

        await deleteDriver(req.params.id);

        return res.status(200).json({
            success:
                true,
            message: "Driver deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};