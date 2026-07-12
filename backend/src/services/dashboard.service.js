import pool from "../config/db.js";


export const getOverview = async () => {
    const [
        totalVehicles,
        availableVehicles,
        activeTrips,
        pendingTrips,
        driversOnDuty,
        maintenanceVehicles,
    ] = await Promise.all([
        pool.query("SELECT COUNT(*) FROM vehicles"),

        pool.query(
            "SELECT COUNT(*) FROM vehicles WHERE status='Available'"
        ),

        pool.query(
            "SELECT COUNT(*) FROM trips WHERE status='Dispatched'"
        ),

        pool.query(
            "SELECT COUNT(*) FROM trips WHERE status='Draft'"
        ),

        pool.query(
            "SELECT COUNT(*) FROM drivers WHERE status='On Trip'"
        ),

        pool.query(
            "SELECT COUNT(*) FROM vehicles WHERE status='In Shop'"
        ),
    ]);

    const total = Number(totalVehicles.rows[0].count);
    const available = Number(availableVehicles.rows[0].count);

    const fleetUtilization =
        total === 0
            ? 0
            : Number((((total - available) / total) * 100).toFixed(2));

    return {
        totalVehicles: total,

        availableVehicles: available,

        activeTrips: Number(activeTrips.rows[0].count),

        pendingTrips: Number(pendingTrips.rows[0].count),

        driversOnDuty: Number(driversOnDuty.rows[0].count),

        maintenanceVehicles: Number(
            maintenanceVehicles.rows[0].count
        ),

        fleetUtilization,
    };
};


export const getKPIs = async () => {
    const [
        fuelCost,
        expenseCost,
        completedTrips,
        totalDrivers,
    ] = await Promise.all([
        pool.query(
            "SELECT COALESCE(SUM(fuel_cost),0) AS total FROM fuel_logs"
        ),

        pool.query(
            "SELECT COALESCE(SUM(amount),0) AS total FROM expenses"
        ),

        pool.query(
            "SELECT COUNT(*) FROM trips WHERE status='Completed'"
        ),

        pool.query(
            "SELECT COUNT(*) FROM drivers"
        ),
    ]);

    return {
        totalFuelCost: Number(fuelCost.rows[0].total),

        totalExpenses: Number(expenseCost.rows[0].total),

        completedTrips: Number(completedTrips.rows[0].count),

        totalDrivers: Number(totalDrivers.rows[0].count),
    };
};



export const getRecentTrips = async () => {
    const result = await pool.query(`
    SELECT
      t.id,
      t.source,
      t.destination,
      t.status,
      t.dispatch_date,

      v.registration_number,

      u.full_name AS driver_name

    FROM trips t

    JOIN vehicles v
    ON t.vehicle_id=v.id

    JOIN drivers d
    ON d.id=t.driver_id

    JOIN users u
    ON u.id=d.user_id

    ORDER BY t.created_at DESC

    LIMIT 5
  `);

    return result.rows;
};



export const getVehicleStatusChart = async () => {
    const result = await pool.query(`
    SELECT
      status,
      COUNT(*)::INT AS count
    FROM vehicles
    GROUP BY status
  `);

    return result.rows;
};



export const getFleetUtilizationChart = async () => {
    const result = await pool.query(`
    SELECT
      DATE(dispatch_date) AS date,
      COUNT(*)::INT AS trips

    FROM trips

    GROUP BY DATE(dispatch_date)

    ORDER BY DATE(dispatch_date)
  `);

    return result.rows;
};


export const getExpenseChart = async () => {
    const result = await pool.query(`
    SELECT
      expense_type,
      SUM(amount)::FLOAT AS total

    FROM expenses

    GROUP BY expense_type
  `);

    return result.rows;
};

export const getRecentActivities = async () => {

    const trips = await pool.query(`
    SELECT
      'Trip' AS type,
      CONCAT('Trip #',id,' ',status) AS activity,
      created_at

    FROM trips
  `);

    const maintenance = await pool.query(`
    SELECT
      'Maintenance' AS type,
      CONCAT(issue,' ',status) AS activity,
      created_at

    FROM maintenance_logs
  `);

    const fuel = await pool.query(`
    SELECT
      'Fuel' AS type,
      CONCAT(liters,' L Fuel Added') AS activity,
      created_at

    FROM fuel_logs
  `);

    const expense = await pool.query(`
    SELECT
      'Expense' AS type,
      CONCAT(expense_type,' ₹',amount) AS activity,
      created_at

    FROM expenses
  `);

    const activities = [
        ...trips.rows,
        ...maintenance.rows,
        ...fuel.rows,
        ...expense.rows,
    ];

    activities.sort(
        (a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
    );

    return activities.slice(0, 10);
};