import { Router } from "express";
import { create, findAll } from "../models/User.js";

const router = Router();

// Create User
router.post("/users", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const newUser = await create({ name, email, password, phone, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Users
router.get("/users", async (req, res) => {
  const users = await findAll();
  res.json(users);
});

export default router;
