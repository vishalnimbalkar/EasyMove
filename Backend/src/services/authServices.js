import { pool } from "../config/db.js";

export const registerUser = async (user) => {
  try {
    const query = `insert into users (name, email, password, phone, role) values (?,?,?,?,?)`;
    const values = [
      user.name,
      user.email,
      user.password,
      user.phone,
      user.role,
    ];
    await pool.query(query, values);
    return { success: true, message: "User register successfully" };
  } catch (error) {
    return { success: false, message: "Failed to register" };
  }
};

export const registerDriver = async (driver) => {};

// export const loginUser = async (data) => {
//   try {
//     const query = `select * from users where email = ? and password = ?`;
//     const values = [data.email, data.password];
//     const [rows] = await pool.query(query, values);
//     return { success: true, message: "Login successful", user: rows[0] };
//   } catch (error) {
//     return { success: false, message: "Failed to login", error: error.message };
//   }
// };

export const loginUser = async (data) => {
  try {
    // Try logging in as regular user
    let query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    let values = [data.email, data.password];
    let [rows] = await pool.query(query, values);

    if (rows.length > 0) {
      return {
        success: true,
        message: 'User login successful',
        user: rows[0],
        role: rows[0].role,
      };
    }

    // If not found in users, try admins
    query = `SELECT * FROM admin WHERE email = ? AND password = ?`;
    [rows] = await pool.query(query, values);

    if (rows.length > 0) {
      return {
        success: true,
        message: 'Admin login successful',
        user: rows[0],
        role: 'admin',
      };
    }

    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to login',
      error: error.message,
    };
  }
};

export const getUser = async (email)=>{
  try {
    const query = `select * from users where email = ?`;
    const [rows] = await pool.query(query, email);
    return { success: true, message: "successful", user: rows[0] };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
}

export const getUserById = async (customer_id)=>{
  try {
    const query = `select * from users where id = ? and role='customer'`;
    const [rows] = await pool.query(query, customer_id);
    return { success: true, message: "successful", user: rows[0] };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
}

export const getDriverById = async (driver_id)=>{
  try {
    const query = `select * from users where id = ? and role='driver'`;
    const [rows] = await pool.query(query, driver_id);
    return { success: true, message: "successful", user: rows[0] };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
}