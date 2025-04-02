import express, { json } from "express";
import { sync } from "./config/db.js";
import User from "./models/User.js";

const app = express();
app.use(json());

// Sync database
sync({ alter: true }) // Set `force: true` to recreate the table (for dev only)
  .then(() => console.log("Database & tables synced"))
  .catch(err => console.error("Error syncing database:", err));

app.listen(3000, () => console.log("Server running on port 3000"));
const userRoutes = require("./routes/userRoutes");

app.use("/api", userRoutes);
