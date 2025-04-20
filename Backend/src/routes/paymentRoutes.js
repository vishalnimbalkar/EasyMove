import express from 'express';
import {getPaymentDetail} from '../controllers/paymentController.js'

const router = express.Router();

router.get('/getDetails/:customer_id', getPaymentDetail);

export default router;