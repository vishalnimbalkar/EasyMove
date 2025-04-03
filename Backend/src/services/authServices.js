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

export const loginUser = async (data) => {
  try {
    const query = `select * from users where email = ? and password = ?`;
    const values = [data.email, data.password];
    const [rows] = await pool.query(query, values);

    return { success: true, message: "Login successful", user: rows[0] };
    if (rows.length > 0) {
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  } catch (error) {
    return { success: false, message: "Failed to login", error: error.message };
  }
};
