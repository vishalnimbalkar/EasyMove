import { pool } from "../config/db.js";

export const booking = async (bookingData) => {
  try {
    const query = `insert into bookings (customer_id, pickup_location, dropoff_location, pickup_date, weight, fare) values (?,?,?,?,?,?)`;
    const values = [
      bookingData.customer_id,
      bookingData.pickup_location,
      bookingData.dropoff_location,
      bookingData.pickup_date,
      bookingData.weight,
      bookingData.fare,
    ];
    console.log(values);
    const res = await pool.query(query, values);
    console.log(res);
    
    return { success: true, message: "Booking successfully" };
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