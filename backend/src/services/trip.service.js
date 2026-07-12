import pool from "../config/db.js";


export const createTripService = async (trip) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Check Vehicle
        const vehicleResult = await client.query(
            "SELECT * FROM vehicles WHERE id = $1",
            [trip.vehicle_id]
        );

        if (vehicleResult.rows.length === 0) {
            throw new Error("Vehicle not found");
        }

        const vehicle = vehicleResult.rows[0];

        if (vehicle.status !== "Available") {
            throw new Error("Vehicle is not available");
        }

        // Check Driver
        const driverResult = await client.query(
            "SELECT * FROM drivers WHERE id = $1",
            [trip.driver_id]
        );

        if (driverResult.rows.length === 0) {
            throw new Error("Driver not found");
        }

        const driver = driverResult.rows[0];

        if (driver.status !== "Available") {
            throw new Error("Driver is not available");
        }

        // License Expiry
        const today = new Date();

        if (new Date(driver.expiry_date) < today) {
            throw new Error("Driver license expired");
        }

        // Capacity Validation
        if (trip.cargo_weight > vehicle.capacity) {
            throw new Error("Cargo exceeds vehicle capacity");
        }

        // Create Trip
        const result = await client.query(
            `INSERT INTO trips
      (
        vehicle_id,
        driver_id,
        source,
        destination,
        cargo_weight,
        planned_distance,
        dispatch_date,
        route_notes,
        status
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,'Draft')
      RETURNING *`,
            [
                trip.vehicle_id,
                trip.driver_id,
                trip.source,
                trip.destination,
                trip.cargo_weight,
                trip.planned_distance,
                trip.dispatch_date,
                trip.route_notes,
            ]
        );

        await client.query("COMMIT");

        return result.rows[0];

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }
};

export const getTrips = async () => {
    const result = await pool.query(
        `SELECT
      t.*,
      v.registration_number,
      v.vehicle_name,
      u.full_name AS driver_name

     FROM trips t

     JOIN vehicles v
     ON t.vehicle_id = v.id

     JOIN drivers d
     ON t.driver_id = d.id

     JOIN users u
     ON d.user_id = u.id

     ORDER BY t.id DESC`
    );

    return result.rows;
};

export const getTripById = async (id) => {

    const result = await pool.query(
        "SELECT * FROM trips WHERE id=$1",
        [id]
    );

    return result.rows[0];

};

export const dispatchTrip = async (id) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const tripResult = await client.query(
            "SELECT * FROM trips WHERE id=$1",
            [id]
        );

        if (tripResult.rows.length === 0) {
            throw new Error("Trip not found");
        }

        const trip = tripResult.rows[0];

        await client.query(
            `UPDATE trips
       SET status='Dispatched'
       WHERE id=$1`,
            [id]
        );

        await client.query(
            `UPDATE vehicles
       SET status='On Trip'
       WHERE id=$1`,
            [trip.vehicle_id]
        );

        await client.query(
            `UPDATE drivers
       SET status='On Trip'
       WHERE id=$1`,
            [trip.driver_id]
        );

        await client.query("COMMIT");

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }

};

export const completeTrip = async (
    id,
    fuel_used,
    final_odometer
) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const tripResult = await client.query(
            "SELECT * FROM trips WHERE id=$1",
            [id]
        );

        const trip = tripResult.rows[0];

        await client.query(
            `UPDATE trips
      SET
      status='Completed',
      completion_date=NOW(),
      fuel_used=$1,
      final_odometer=$2
      WHERE id=$3`,
            [
                fuel_used,
                final_odometer,
                id,
            ]
        );

        await client.query(
            `UPDATE vehicles
       SET
       status='Available',
       odometer=$1
       WHERE id=$2`,
            [
                final_odometer,
                trip.vehicle_id,
            ]
        );

        await client.query(
            `UPDATE drivers
       SET status='Available'
       WHERE id=$1`,
            [
                trip.driver_id,
            ]
        );
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const deleteTrip = async (id) => {

    await pool.query(
        "DELETE FROM trips WHERE id=$1",
        [id]
    );

};