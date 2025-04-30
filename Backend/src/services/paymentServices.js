import { pool } from "../config/db.js";
import Razorpay from "razorpay";


export const getAllPayments = async () => {
  try {
    const query = `select * from payments`;
    const [rows] = await pool.query(query);
    return { success: true, message: "successful", payments: rows };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};

export const getPaymentDetails = async (customer_id) => {
  try {
    const query = `
      SELECT p.*
      FROM payments p
      JOIN bookings b ON p.booking_id = b.id
      WHERE b.customer_id = ?
    `;
    const [rows] = await pool.query(query, [customer_id]);
    return { success: true, message: "successful", payments: rows };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};

// Initialize Razorpay instance (correct name is razorpay)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


export const createOrder = async (amount, currency) => {
  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
    receipt: 'receipt_order_' + Math.random().toString(36).substring(7),
  };

  const order = await razorpay.orders.create(options); // ✅ fixed here
  return order;
};

export const insertPayment = async (paymentData) => {
  const query = `
    INSERT INTO payments (booking_id, amount, payment_method, payment_status, transaction_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    paymentData.booking_id,
    paymentData.amount,
    paymentData.payment_method,
    paymentData.payment_status,
    paymentData.transaction_id
  ];

  await pool.query(query, values);
};