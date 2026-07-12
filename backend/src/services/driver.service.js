import pool from "../config/db.js";

export const getDriverByLicense = async (license) => {
    const result = await pool.query(
        "SELECT * FROM drivers WHERE license_number = $1",
        [license]
    );

    return result.rows[0];
};

export const createDriverService = async (driver) => {
    const result = await pool.query(
        `INSERT INTO drivers
    (
      user_id,
      license_number,
      license_category,
      expiry_date,
      safety_score,
      status
    )
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *`,
        [
            driver.user_id,
            driver.license_number,
            driver.license_category,
            driver.expiry_date,
            driver.safety_score || 100,
            driver.status || "Available",
        ]
    );

    return result.rows[0];
};

export const getAllDrivers = async () => {
    const result = await pool.query(
        `SELECT
        drivers.*,
        users.full_name,
        users.email
     FROM drivers
     JOIN users ON drivers.user_id = users.id
     ORDER BY drivers.id DESC`
    );

    return result.rows;
};

export const getDriverById = async (id) => {
    const result = await pool.query(
        `SELECT
        drivers.*,
        users.full_name,
        users.email
     FROM drivers
     JOIN users ON drivers.user_id = users.id
     WHERE drivers.id = $1`,
        [id]
    );

    return result.rows[0];
};

export const updateDriver = async (id, driver) => {
    const result = await pool.query(
        `UPDATE drivers
     SET
       license_number=$1,
       license_category=$2,
       expiry_date=$3,
       safety_score=$4,
       status=$5,
       updated_at=CURRENT_TIMESTAMP
     WHERE id=$6
     RETURNING *`,
        [
            driver.license_number,
            driver.license_category,
            driver.expiry_date,
            driver.safety_score,
            driver.status,
            id,
        ]
    );

    return result.rows[0];
};

export const deleteDriver = async (id) => {
    await pool.query(
        "DELETE FROM drivers WHERE id=$1",
        [id]
    );
};