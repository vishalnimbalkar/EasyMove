import { pool } from "../config/db.js";

export const booking = async (bookingData) => {
  try {
    const query = `insert into bookings (customer_id, pickup_location, dropoff_location, pickup_date, weight, fare,payment_status) values (?,?,?,?,?,?,?)`;
    const status = 'paid' 
    const values = [
      bookingData.customer_id,
      bookingData.pickup_location,
      bookingData.dropoff_location,
      bookingData.pickup_date,
      bookingData.weight,
      bookingData.fare,
      status
    ];
    const [result] = await pool.query(query, values);
    console.log(result);

    return { 
      success: true, 
      message: "Booking successfully",
      booking_id: result.insertId 
    };
  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false, message: "Failed to Booking" };
  }
};

export const getBookingDetails = async (customer_id)=>{
  try {
    const query = `select * from bookings where customer_id = ?`;
    const [rows] = await pool.query(query, customer_id);
    return { success: true, message: "successful", bookings: rows};
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
}