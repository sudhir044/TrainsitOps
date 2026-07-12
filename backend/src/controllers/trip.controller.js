import { validationResult } from "express-validator";

import {
    createTripService,
    getTrips,
    getTripById,
    dispatchTrip,
    completeTrip,
    deleteTrip,
} from "../services/trip.service.js";



export const createTrip = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const trip = await createTripService(req.body);

        return res.status(201).json({
            success: true,
            message: "Trip created successfully",
            data: trip,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};



export const getAllTrips = async (req, res) => {
    try {

        const trips = await getTrips();

        return res.status(200).json({
            success: true,
            count: trips.length,
            data: trips,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getTrip = async (req, res) => {
    try {

        const trip = await getTripById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: trip,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



export const dispatchTripController = async (req, res) => {

    try {

        await dispatchTrip(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Trip dispatched successfully",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


export const completeTripController = async (req, res) => {

    try {

        const { fuel_used, final_odometer } = req.body;

        await completeTrip(
            req.params.id,
            fuel_used,
            final_odometer
        );

        return res.status(200).json({
            success: true,
            message: "Trip completed successfully",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


export const deleteTripController = async (req, res) => {

    try {

        await deleteTrip(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Trip deleted successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};