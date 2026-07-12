import pool from "../config/db.js";

// Create Fuel Log
export const createFuelLog = async (data) => {

    const vehicle = await pool.query(
        "SELECT * FROM vehicles WHERE id=$1",
        [data.vehicle_id]
    );

    if (vehicle.rows.length === 0) {
        throw new Error("Vehicle not found");
    }

    const result = await pool.query(
        `INSERT INTO fuel_logs
        (
            vehicle_id,
            liters,
            fuel_cost,
            fuel_date
        )
        VALUES($1,$2,$3,$4)
        RETURNING *`,
        [
            data.vehicle_id,
            data.liters,
            data.fuel_cost,
            data.fuel_date || new Date()
        ]
    );

    return result.rows[0];

};

// Get All Fuel Logs
export const getFuelLogs = async () => {

    const result = await pool.query(
        `SELECT
            f.*,
            v.registration_number,
            v.vehicle_name
        FROM fuel_logs f
        JOIN vehicles v
        ON f.vehicle_id=v.id
        ORDER BY f.id DESC`
    );

    return result.rows;

};

// Get Fuel Log By ID
export const getFuelLogById = async (id) => {

    const result = await pool.query(
        "SELECT * FROM fuel_logs WHERE id=$1",
        [id]
    );

    return result.rows[0];

};

// Update Fuel Log
export const updateFuelLog = async (id, data) => {

    const result = await pool.query(
        `UPDATE fuel_logs
        SET
            liters=$1,
            fuel_cost=$2,
            fuel_date=$3
        WHERE id=$4
        RETURNING *`,
        [
            data.liters,
            data.fuel_cost,
            data.fuel_date,
            id
        ]
    );

    return result.rows[0];

};

// Delete Fuel Log
export const deleteFuelLog = async (id) => {

    await pool.query(
        "DELETE FROM fuel_logs WHERE id=$1",
        [id]
    );

};