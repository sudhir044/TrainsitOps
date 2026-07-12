import pool from "../config/db.js";

export const getVehicleByRegistration = async (registration) => {
    const result = await pool.query(
        "SELECT * FROM vehicles WHERE registration_number=$1",
        [registration]
    );

    return result.rows[0];
};

export const createVehicleService = async (vehicle) => {
    const result = await pool.query(
        `INSERT INTO vehicles
    (
      registration_number,
      vehicle_name,
      model,
      vehicle_type,
      capacity,
      odometer,
      acquisition_cost,
      status
    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
        [
            vehicle.registration_number,
            vehicle.vehicle_name,
            vehicle.model,
            vehicle.vehicle_type,
            vehicle.capacity,
            vehicle.odometer || 0,
            vehicle.acquisition_cost || 0,
            vehicle.status || "Available",
        ]
    );

    return result.rows[0];
};

export const getAllVehicles = async () => {
    const result = await pool.query(
        "SELECT * FROM vehicles ORDER BY id DESC"
    );

    return result.rows;
};

export const getVehicleById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM vehicles WHERE id=$1",
        [id]
    );

    return result.rows[0];
};

export const updateVehicle = async (id, vehicle) => {
    const result = await pool.query(
        `UPDATE vehicles
     SET
      registration_number=$1,
      vehicle_name=$2,
      model=$3,
      vehicle_type=$4,
      capacity=$5,
      odometer=$6,
      acquisition_cost=$7,
      status=$8,
      updated_at=CURRENT_TIMESTAMP
     WHERE id=$9
     RETURNING *`,
        [
            vehicle.registration_number,
            vehicle.vehicle_name,
            vehicle.model,
            vehicle.vehicle_type,
            vehicle.capacity,
            vehicle.odometer,
            vehicle.acquisition_cost,
            vehicle.status,
            id,
        ]
    );

    return result.rows[0];
};

export const deleteVehicle = async (id) => {
    await pool.query(
        "DELETE FROM vehicles WHERE id=$1",
        [id]
    );
};