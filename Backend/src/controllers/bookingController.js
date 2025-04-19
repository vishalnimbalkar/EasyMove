import { booking } from "../services/bookingServices.js";

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