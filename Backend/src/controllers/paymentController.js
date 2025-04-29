import {  getPaymentDetails, createOrder, insertPayment, getAllPayments } from "../services/paymentServices.js";
import Razorpay from 'razorpay';

export const getAllPaymentsController = async (req, res)=>{
  try {
    const response = await getAllPayments();
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
      console.log(error);
    return {success : false , message : 'Failed'}
  }
}

  export const getPaymentDetail = async (req, res)=>{
    const customer_id = req.params.customer_id;    
    try {
      const response = await getPaymentDetails(customer_id);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
        console.log(error);
      return {success : false , message : 'Failed'}
    }
  }

  export const createOrderController = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const order = await createOrder(amount, currency);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


export const savePaymentController = async (req, res) => {
  try {
    const { booking_id, transaction_id, amount } = req.body;

    // 1. Fetch payment details from Razorpay
    const paymentDetails = await razorpayInstance.payments.fetch(transaction_id);

    // 2. Extract payment method and status
    const paymentMethod = paymentDetails.method; // like 'card', 'upi', etc
    const paymentStatus = paymentDetails.status === 'captured' ? 'successful' : 'failed';

    // 3. Save into your database
    const paymentData = {
      booking_id,
      amount,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      transaction_id
    };

    await insertPayment(paymentData); // Your SQL Insert

    res.status(200).json({ success: true, message: 'Payment saved successfully' });

  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ success: false, message: 'Failed to save payment', error: error.message });
  }
};