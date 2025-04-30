import userModel from "../models/userModel.js";
import { getUser, loginUser, registerUser,getUserById, getDriverById, checkEamil } from "../services/authServices.js";

export const register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const user = { name, email, password, phone, role };

  try {
    const response = await registerUser(user);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed To Register'}
  }
};

export const login = async (req, res) => {

  const { email, password} = req.body;
  const data = { email, password};

  try {
    const response = await loginUser(data);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed to login'}
  }
};

export const getUserDetail = async (req, res)=>{
  const email = req.params.email
  try {
    const response = await getUser(email);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed'}
  }
}

export const getUserDetailsById = async (req, res)=>{
  const customer_id = req.params.customer_id
  try {
    const response = await getUserById(customer_id);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed'}
  }
}

export const getDriverDetailsById = async (req, res)=>{
  const driver_id = req.params.driver_id;
  try {
    const response = await getDriverById(driver_id);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed'}
  }
}


export const checkEamilController = async (req, res)=>{
  const {email} = req.body;
  try {
    const response = await checkEamil(email);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed'}
  }
}