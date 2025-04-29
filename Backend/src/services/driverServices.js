import { pool } from "../config/db.js";

export const getAllDrivers = async () => {
  try {
    const query = `select * from users where role = ?`;
    const [rows] = await pool.query(query, 'driver');
    return { success: true, message: "successful", drivers: rows };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};
