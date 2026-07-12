import pool from "../config/db.js";



export const getSummaryReport = async () => {

    const [
        vehicles,
        drivers,
        completedTrips,
        fuel,
        expenses
    ] = await Promise.all([

        pool.query("SELECT COUNT(*) FROM vehicles"),

        pool.query("SELECT COUNT(*) FROM drivers"),

        pool.query(
            "SELECT COUNT(*) FROM trips WHERE status='Completed'"
        ),

        pool.query(
            "SELECT COALESCE(SUM(fuel_cost),0) AS total FROM fuel_logs"
        ),

        pool.query(
            "SELECT COALESCE(SUM(amount),0) AS total FROM expenses"
        )

    ]);

    return {

        totalVehicles: Number(vehicles.rows[0].count),

        totalDrivers: Number(drivers.rows[0].count),

        completedTrips: Number(completedTrips.rows[0].count),

        totalFuelCost: Number(fuel.rows[0].total),

        totalExpenses: Number(expenses.rows[0].total)

    };

};



export const getTripReport = async () => {

    const result = await pool.query(`
    SELECT
      status,
      COUNT(*)::INT AS total
    FROM trips
    GROUP BY status
  `);

    return result.rows;

};



export const getFuelReport = async () => {

    const result = await pool.query(`
    SELECT
      v.registration_number,
      SUM(f.liters)::FLOAT AS total_liters,
      SUM(f.fuel_cost)::FLOAT AS total_cost

    FROM fuel_logs f

    JOIN vehicles v
    ON v.id=f.vehicle_id

    GROUP BY v.registration_number

    ORDER BY total_cost DESC
  `);

    return result.rows;

};


export const getExpenseReport = async () => {

    const result = await pool.query(`
    SELECT
      expense_type,
      SUM(amount)::FLOAT AS total

    FROM expenses

    GROUP BY expense_type

    ORDER BY total DESC
  `);

    return result.rows;

};



export const getMaintenanceReport = async () => {

    const result = await pool.query(`
    SELECT
      status,
      COUNT(*)::INT AS total

    FROM maintenance_logs

    GROUP BY status
  `);

    return result.rows;

};



export const getDriverReport = async () => {

    const result = await pool.query(`
    SELECT

      u.full_name,

      d.safety_score,

      COUNT(t.id)::INT AS trips

    FROM drivers d

    JOIN users u
    ON u.id=d.user_id

    LEFT JOIN trips t
    ON t.driver_id=d.id

    GROUP BY
      u.full_name,
      d.safety_score

    ORDER BY trips DESC
  `);

    return result.rows;

};