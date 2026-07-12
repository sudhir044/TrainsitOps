import pool from "../config/db.js";

// Create Maintenance
export const createMaintenance = async (data) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const vehicle = await client.query(
            "SELECT * FROM vehicles WHERE id=$1",
            [data.vehicle_id]
        );

        if (vehicle.rows.length === 0) {
            throw new Error("Vehicle not found");
        }

        const result = await client.query(
            `INSERT INTO maintenance_logs
      (
        vehicle_id,
        issue,
        description,
        cost,
        status
      )
      VALUES($1,$2,$3,$4,'Pending')
      RETURNING *`,
            [
                data.vehicle_id,
                data.issue,
                data.description,
                data.cost || 0,
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

// Get All
export const getMaintenances = async () => {
    const result = await pool.query(`
    SELECT
      m.*,
      v.registration_number,
      v.vehicle_name
    FROM maintenance_logs m
    JOIN vehicles v
    ON m.vehicle_id = v.id
    ORDER BY m.id DESC
  `);

    return result.rows;
};

// Get By ID
export const getMaintenanceById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM maintenance_logs WHERE id=$1",
        [id]
    );

    return result.rows[0];
};

// Start Maintenance
export const startMaintenance = async (id) => {
    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const maintenance = await client.query(
            "SELECT * FROM maintenance_logs WHERE id=$1",
            [id]
        );

        if (maintenance.rows.length === 0) {
            throw new Error("Maintenance record not found");
        }

        await client.query(
            "UPDATE maintenance_logs SET status='In Progress' WHERE id=$1",
            [id]
        );

        await client.query(
            "UPDATE vehicles SET status='In Shop' WHERE id=$1",
            [maintenance.rows[0].vehicle_id]
        );

        await client.query("COMMIT");

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
};

// Complete Maintenance
export const completeMaintenance = async (id) => {
    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const maintenance = await client.query(
            "SELECT * FROM maintenance_logs WHERE id=$1",
            [id]
        );

        await client.query(
            `UPDATE maintenance_logs
       SET
       status='Completed',
       end_date=CURRENT_DATE
       WHERE id=$1`,
            [id]
        );

        await client.query(
            "UPDATE vehicles SET status='Available' WHERE id=$1",
            [maintenance.rows[0].vehicle_id]
        );

        await client.query("COMMIT");

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
};

// Delete
export const deleteMaintenance = async (id) => {
    await pool.query(
        "DELETE FROM maintenance_logs WHERE id=$1",
        [id]
    );
};