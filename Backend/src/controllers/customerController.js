import {  getAllCustomers } from "../services/customerServices.js";

  export const getAllCustomersController = async (req, res)=>{
    try {
      const response = await getAllCustomers();
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