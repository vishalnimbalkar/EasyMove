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
export const getBookingDetailsForDriver = async (driver_id)=>{
  try {
    const query = `select * from bookings where driver_id = ?`;
    const [rows] = await pool.query(query, driver_id);
    return { success: true, message: "successful", bookings: rows};
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
}

export const cancelBooking = async (booking_id) => {
  try {
    const query = `update bookings set booking_status = 'cancelled' WHERE id = ?`;
    const [result] = await pool.query(query, [booking_id]);

    if (result.affectedRows === 0) {
      return { success: false, message: "Booking not found" };
    }

    return { success: true, message: "Booking cancelled successfully" };
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    return { success: false, message: "Failed to cancel booking" };
  }
};

export const completeBooking = async (booking_id) => {
  try {
    const query = `update bookings set booking_status = 'completed' WHERE id = ?`;
    const [result] = await pool.query(query, [booking_id]);

    if (result.affectedRows === 0) {
      return { success: false, message: "Booking not found" };
    }

    return { success: true, message: "Booking completed successfully" };
  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false, message: "Failed" };
  }
};

export const getAllBookingDetails = async ()=>{
  try {
    const query = `select * from bookings`;
    const [rows] = await pool.query(query);
    return { success: true, message: "successful", bookings: rows};
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
}

export const assignDriver = async (booking_id, driver_id)=>{
  try {
    const query = `update bookings set driver_id = ? where booking_id = ?`
    values = [
      driver_id,
      booking_id
    ]
    await pool.query(query, values);
    return { success: true, message: "Assigned successfullyy"};
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
}