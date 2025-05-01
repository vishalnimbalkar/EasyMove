import { getAllVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle } from "../services/vehicleServices.js";

export const addVehicleController = async (req, res) => {
  const { driver_id, vehicle_type, vehicle_number, capacity } = req.body;
  const vehicle = {driver_id, vehicle_type, vehicle_number, capacity };

  try {
    const response = await addVehicle(vehicle);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed To Register'}
  }
};

export const  getAllVehiclesController = async (req, res)=>{
  try {
    const response = await getAllVehicles();
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    return {success : false , message : 'Failed'}
  }
}

export const  getVehicleByIdController = async (req, res)=>{
  const driver_id = req.params.driver_id;   
    try {
      const response = await getVehicleById(driver_id);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed'}
    }
  }

  export const updateVehicleController = async (req, res) => {
    const { vehicle_type, vehicle_number, capacity, id} = req.body;
    const vehicle = {vehicle_type, vehicle_number, capacity, id};
  
    try {
      const response = await updateVehicle(vehicle);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error) {
      return {success : false , message : 'Failed To Register'}
    }
  };

  export const  deleteVehicleController = async (req, res)=>{
    const vehicle_id = req.params.vehicle_id;
      try {
        const response = await deleteVehicle(vehicle_id);
        if (response.success) {
          res.status(200).json(response);
        } else {
          res.status(400).json(response);
        }
      } catch (error) {
        return {success : false , message : 'Failed'}
      }
    }