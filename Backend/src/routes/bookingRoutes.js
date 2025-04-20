import express from 'express';
import {booking_request, getBookingDetail} from '../controllers/bookingController.js'

const router = express.Router();

router.post('/request', booking_request);
router.get('/getDetails/:customer_id', getBookingDetail);

export default router;