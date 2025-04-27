import express from 'express';
import {booking_request, getBookingDetail, cancelBookingController, getAllBookingDetailController} from '../controllers/bookingController.js'

const router = express.Router();

router.post('/request', booking_request);
router.get('/getDetails/:customer_id', getBookingDetail);
router.delete('/cancelBooking/:booking_id', cancelBookingController);
router.get('/getAllDetails/', getAllBookingDetailController);

export default router;