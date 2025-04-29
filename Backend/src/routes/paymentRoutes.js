import express from 'express';
import {getPaymentDetail, createOrderController, savePaymentController, getAllPaymentsController} from '../controllers/paymentController.js'

const router = express.Router();

router.get('/getAll', getAllPaymentsController);
router.get('/getDetails/:customer_id', getPaymentDetail);
router.post('/create-order', createOrderController);
router.post('/insertPaymentDetails', savePaymentController);
export default router; 