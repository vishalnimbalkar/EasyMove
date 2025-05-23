import express, { json } from "express";
import { checkConnection } from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import customerRoutes from './routes/customerRoutes.js'
import driverRoutes from './routes/driverRoutes.js'
import vehicleRoutes from './routes/vehicleRoutes.js'
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";


const app = express();

app.use(cors({
  origin: "http://localhost:4200", // Allow requests from Angular app
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS", // Allowed methods
  allowedHeaders: "Content-Type,Authorization" // Allowed headers
}))
app.use(express.json()); 
app.use(bodyParser.json());
app.use('/auth', authRoutes); 
app.use('/booking', bookingRoutes);
app.use('/payment', paymentRoutes);
app.use('/customer', customerRoutes);
app.use('/driver', driverRoutes);
app.use('/vehicle', vehicleRoutes);
app.listen(3000, async() => {
  console.log('Server running on port 3000');
  try {
    await checkConnection();
  } catch (error) {
    console.log("Failed to initialize the database",error);
    
  }
});
