import express from 'express';
import {booking_request, getBookingDetail, cancelBookingController, getAllBookingDetailController, getBookingDetailsForDriverController, completedBookingController} from '../controllers/bookingController.js'

const router = express.Router();

router.post('/request', booking_request);
router.get('/getDetails/:customer_id', getBookingDetail);
router.get('/getDetailsForDriver/:driver_id', getBookingDetailsForDriverController);
router.delete('/cancelBooking/:booking_id', cancelBookingController);
router.post('/completeBooking', completedBookingController);
router.get('/getAllDetails/', getAllBookingDetailController);

export default router;