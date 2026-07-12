import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT users.*, roles.role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE email=$1`,
    [email]
  );

  return result.rows[0];
};

export const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const result = await pool.query(
    `INSERT INTO users
    (role_id, full_name, email, password, phone)
    VALUES($1,$2,$3,$4,$5)
    RETURNING id, full_name, email`,
    [
      user.role_id,
      user.full_name,
      user.email,
      hashedPassword,
      user.phone,
    ]
  );

  return result.rows[0];
};