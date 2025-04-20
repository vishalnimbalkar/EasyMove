import { pool } from "../config/db.js";

export const getPaymentDetails = async (customer_id) => {
    try {
      const query = `
        SELECT p.*
        FROM payments p
        JOIN bookings b ON p.booking_id = b.id
        WHERE b.customer_id = ?
      `;
      const [rows] = await pool.query(query, [customer_id]); // use array for params
      return { success: true, message: "successful", payments: rows };
    } catch (error) {
      return { success: false, message: "Failed", error: error.message };
    }
  };
  