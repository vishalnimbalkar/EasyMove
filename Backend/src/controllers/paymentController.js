import {  getPaymentDetails } from "../services/paymentServices.js";

  export const getPaymentDetail = async (req, res)=>{
    const customer_id = req.params.customer_id;
    console.log(customer_id);
    
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