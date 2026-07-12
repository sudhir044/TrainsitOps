import {
    getOverview,
    getKPIs,
    getRecentTrips,
    getVehicleStatusChart,
    getFleetUtilizationChart,
    getExpenseChart,
    getRecentActivities,
} from "../services/dashboard.service.js";


export const overviewController = async (req, res) => {
    try {
        const data = await getOverview();

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


export const kpiController = async (req, res) => {
    try {
        const data = await getKPIs();

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



export const recentTripsController = async (req, res) => {
    try {
        const data = await getRecentTrips();

        return res.status(200).json({
            success: true,
            count: data.length,
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



export const vehicleStatusChartController = async (req, res) => {
    try {
        const data = await getVehicleStatusChart();

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


export const fleetUtilizationChartController = async (req, res) => {
    try {
        const data = await getFleetUtilizationChart();

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

export const expenseChartController = async (req, res) => {
    try {
        const data = await getExpenseChart();

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

export const recentActivitiesController = async (req, res) => {
    try {
        const data = await getRecentActivities();

        return res.status(200).json({
            success: true,
            count: data.length,
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