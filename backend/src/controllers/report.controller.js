import {
    getSummaryReport,
    getTripReport,
    getFuelReport,
    getExpenseReport,
    getMaintenanceReport,
    getDriverReport,
} from "../services/report.service.js";

const sendResponse = async (service, res) => {
    try {
        const data = await service();

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const summaryReportController = (req, res) =>
    sendResponse(getSummaryReport, res);

export const tripReportController = (req, res) =>
    sendResponse(getTripReport, res);

export const fuelReportController = (req, res) =>
    sendResponse(getFuelReport, res);

export const expenseReportController = (req, res) =>
    sendResponse(getExpenseReport, res);

export const maintenanceReportController = (req, res) =>
    sendResponse(getMaintenanceReport, res);

export const driverReportController = (req, res) =>
    sendResponse(getDriverReport, res);