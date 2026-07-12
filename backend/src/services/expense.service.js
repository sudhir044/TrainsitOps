import pool from "../config/db.js";

// Create Expense
export const createExpense = async (data) => {
    const vehicle = await pool.query(
        "SELECT * FROM vehicles WHERE id=$1",
        [data.vehicle_id]
    );

    if (vehicle.rows.length === 0) {
        throw new Error("Vehicle not found");
    }

    const result = await pool.query(
        `INSERT INTO expenses
    (
      vehicle_id,
      expense_type,
      amount,
      description,
      expense_date
    )
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,
        [
            data.vehicle_id,
            data.expense_type,
            data.amount,
            data.description,
            data.expense_date || new Date(),
        ]
    );

    return result.rows[0];
};

// Get All Expenses
export const getExpenses = async () => {
    const result = await pool.query(
        `SELECT
      e.*,
      v.registration_number,
      v.vehicle_name
     FROM expenses e
     JOIN vehicles v
     ON e.vehicle_id = v.id
     ORDER BY e.id DESC`
    );

    return result.rows;
};

// Get Expense By ID
export const getExpenseById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM expenses WHERE id=$1",
        [id]
    );

    return result.rows[0];
};

// Update Expense
export const updateExpense = async (id, data) => {
    const result = await pool.query(
        `UPDATE expenses
     SET
       expense_type=$1,
       amount=$2,
       description=$3,
       expense_date=$4
     WHERE id=$5
     RETURNING *`,
        [
            data.expense_type,
            data.amount,
            data.description,
            data.expense_date,
            id,
        ]
    );

    return result.rows[0];
};

// Delete Expense
export const deleteExpense = async (id) => {
    await pool.query(
        "DELETE FROM expenses WHERE id=$1",
        [id]
    );
};