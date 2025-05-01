import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `insert into users (name, email, password, phone, role) values (?,?,?,?,?)`;
    const values = [
      user.name,
      user.email,
      hashedPassword,
      user.phone,
      user.role,
    ];
    await pool.query(query, values);
    return { success: true, message: "User register successfully" };
  } catch (error) {
    return { success: false, message: "Failed to register" };
  }
};

export const registerDriver = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `insert into users (name, email, password, phone, role) values (?,?,?,?,?)`;
    const values = [
      user.name,
      user.email,
      hashedPassword,
      user.phone,
      user.role,
    ];
    await pool.query(query, values);
    return { success: true, message: "User register successfully" };
  } catch (error) {
    return { success: false, message: "Failed to register" };
  }
};

export const loginUser = async (data) => {
  try {
    // Try logging in as regular user
    let query = `SELECT * FROM users WHERE email = ?`;
    let [rows] = await pool.query(query, [data.email]);

    if (rows.length > 0) {
      const isMatch = await bcrypt.compare(data.password, rows[0].password);
      if (isMatch) {
        return {
          success: true,
          message: "User login successful",
          user: rows[0],
          role: rows[0].role,
        };
      }
    }

    // If not found in users, try admins
    query = `SELECT * FROM admin WHERE email = ?`;
    [rows] = await pool.query(query, [data.email]);

    if (rows.length > 0) {
      const isMatch = await bcrypt.compare(data.password, rows[0].password);
      if (isMatch) {
        return {
          success: true,
          message: "Admin login successful",
          user: rows[0],
          role: "admin",
        };
      }
    }

    return { success: false, message: "Invalid credentials" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to login",
      error: error.message,
    };
  }
};

export const getUser = async (email) => {
  try {
    const query = `select * from users where email = ?`;
    const [rows] = await pool.query(query, email);
    return { success: true, message: "successful", user: rows[0] };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};

export const getUserById = async (customer_id) => {
  try {
    const query = `select * from users where id = ? and role='customer'`;
    const [rows] = await pool.query(query, customer_id);
    return { success: true, message: "successful", user: rows[0] };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};

export const getDriverById = async (driver_id) => {
  try {
    const query = `select * from users where id = ? and role='driver'`;
    const [rows] = await pool.query(query, driver_id);
    return { success: true, message: "successful", user: rows[0] };
  } catch (error) {
    return { success: false, message: "Failed", error: error.message };
  }
};

// Express route to check if the email exists
export const checkEamil = async (email) => {
  try {
    let query = `SELECT * FROM users WHERE email = ?`;
    let [rows] = await pool.query(query, [email]);

    let query2 = `SELECT * FROM admin WHERE email = ?`;
    let [rows2] = await pool.query(query2, [email]);

    if (rows.length > 0) {
      return { success: false, message: "Email is already in use." };
    } else if (rows2.length > 0) {
      return { success: false, message: "Email is already in use." };
    }
    return { success: true, message: "Email is available." };
  } catch (err) {
    return { success: false, message: "Server error" };
  }
};

export const updateUser = async (user) => {
  try {
    if (user.password !== undefined && user.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const query = `UPDATE users SET name = ?, password = ? WHERE id = ?`;
      const values = [user.name, hashedPassword, user.user_id];
      await pool.query(query, values);
    } else {
      const query = `UPDATE users SET name = ? WHERE id = ?`;
      const values = [user.name, user.user_id];
      await pool.query(query, values);
    }
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Update user error:", error);
    return { success: false, message: "Failed to update user" };
  }
};
