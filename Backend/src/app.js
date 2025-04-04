import express, { json } from "express";
import { checkConnection } from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "http://localhost:4200", // Allow requests from Angular app
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed methods
  allowedHeaders: "Content-Type,Authorization" // Allowed headers
}))
app.use(express.json()); 
app.use('/auth', authRoutes);

app.listen(3000, async() => {
  console.log('Server running on port 3000');
  try {
    await checkConnection();
  } catch (error) {
    console.log("Failed to initialize the database",error);
    
  }
});

