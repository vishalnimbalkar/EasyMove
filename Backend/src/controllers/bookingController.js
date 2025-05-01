import { booking, getBookingDetails,cancelBooking, getAllBookingDetails, getBookingDetailsForDriver, completeBooking } from "../services/bookingServices.js";

export const booking_request = async (req, res) => {
    const { customer_id, pickup_location, dropoff_location, pickup_date, weight, fare } = req.body;
    const bookingData = { customer_id, pickup_location, dropoff_location, pickup_date, weight, fare};
  
    try {
      const response = await booking(bookingData);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed To Booking'}
    }
  };

  export const getBookingDetail = async (req, res)=>{
    const customer_id = req.params.customer_id;
    try {
      const response = await getBookingDetails(customer_id);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed'}
    }
  }

  export const getBookingDetailsForDriverController = async (req, res)=>{
    const driver_id = req.params.driver_id;
    try {
      const response = await getBookingDetailsForDriver(driver_id);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed'}
    }
  }

  export const cancelBookingController = async (req, res)=>{
    const booking_id = req.params.booking_id;
    try {
      const response = await cancelBooking(booking_id);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed'}
    }
  }

  export const completedBookingController = async (req, res)=>{
    const {booking_id} = req.body;
    try {
      const response = await completeBooking(booking_id);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed'}
    }
  }

  export const getAllBookingDetailController = async (req, res)=>{
    try {
      const response = await getAllBookingDetails();
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed'}
    }
  }