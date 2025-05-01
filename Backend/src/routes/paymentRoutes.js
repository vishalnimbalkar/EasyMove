import express from 'express';
import {getPaymentDetail, createOrderController, savePaymentController, getAllPaymentsController, getPaymentDetail2} from '../controllers/paymentController.js'

const router = express.Router();

router.get('/getAll', getAllPaymentsController);
router.get('/getCustomerDetails/:customer_id', getPaymentDetail);
router.get('/getDriverDetails/:driver_id', getPaymentDetail2);
router.post('/create-order', createOrderController);
router.post('/insertPaymentDetails', savePaymentController);
export default router; 