import express from 'express';
import {booking_request} from '../controllers/bookingController.js'

const router = express.Router();

router.post('/request', booking_request);

export default router;