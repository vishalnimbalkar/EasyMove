import userModel from "../models/userModel.js";
import { loginUser, registerUser } from "../services/authServices.js";

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
