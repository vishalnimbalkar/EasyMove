
export const booking = async (user) => {
  try {
    const query = `insert into bookings () values (?,?,?,?,?)`;
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