import { pool } from "../config/db.js";

export const getAllCustomers = async () => {
  try {
    const query = `select * from users where role = ?`;
    const [rows] = await pool.query(query, 'customer');
    return { success: true, message: "successful", customers: rows };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};
