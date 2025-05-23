import { pool } from "../config/db.js";

export const getAllVehicles = async () => {
  try {
    const query = `
      SELECT 
        v.id AS vehicle_id,
        v.vehicle_type,
        v.vehicle_number,
        v.capacity,
        v.status,
        v.created_at AS vehicle_created_at,
        u.id AS driver_id,
        u.name AS driver_name,
        u.email AS driver_email,
        u.phone AS driver_phone,
        u.created_at AS driver_created_at
      FROM vehicles v
      JOIN users u ON v.driver_id = u.id
      WHERE u.role = 'driver'
    `;

    const [rows] = await pool.query(query);
    return { success: true, message: "successful", vehicles: rows };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};


export const getVehicleById = async (driver_id) => {    
    try {
      const query = `select * from vehicles where driver_id = ?`;
      const [rows] = await pool.query(query,driver_id);
      return { success: true, message: "successful", vehicles: rows };
    } catch (error) {
      return { success: false, message: "Failed", error: error.message };
    }
  };

export const getByVehicleId = async (vehicle_id) => {    
    try {
      const query = `select * from vehicles where id = ?`;
      const [rows] = await pool.query(query,vehicle_id);
      return { success: true, message: "successful", vehicle: rows[0] };
    } catch (error) {
      return { success: false, message: "Failed", error: error.message };
    }
  };

  export const addVehicle = async (vehicle) => {
    try {
        const query = `insert into vehicles (driver_id, vehicle_type, vehicle_number, capacity) values (?,?,?,?)`;
    const values = [
        vehicle.driver_id,
        vehicle.vehicle_type,
        vehicle.vehicle_number,
        vehicle.capacity
    ];
      const [rows] = await pool.query(query,values);
      return { success: true, message: "successful", vehicles: rows };
    } catch (error) {
      return { success: false, message: "Failed", error: error.message };
    }
  };

  
  export const updateVehicle = async (vehicle) => {
    try {
        const query = `update vehicles set vehicle_type = ?, vehicle_number = ? , capacity = ? where id = ?`;
    const values = [
        vehicle.vehicle_type,
        vehicle.vehicle_number,
        vehicle.capacity,
        vehicle.id
    ];
      await pool.query(query,values);
      return { success: true, message: "successful"};
    } catch (error) {
      return { success: false, message: "Failed", error: error.message };
    }
  };

  export const deleteVehicle = async (vehicle_id) => {
    try {
        const query = `delete from vehicles where id = ?`;
      await pool.query(query,[vehicle_id]);
      return { success: true, message: "successful"};
    } catch (error) {
      return { success: false, message: "Failed", error: error.message };
    }
  };