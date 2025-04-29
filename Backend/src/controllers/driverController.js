import {  getAllDrivers } from "../services/driverServices.js";

  export const getAllDriversController = async (req, res)=>{
    try {
      const response = await getAllDrivers();
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