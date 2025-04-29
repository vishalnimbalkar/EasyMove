import express from 'express';
import {getAllDriversController} from '../controllers/driverController.js'

const router = express.Router();

router.get('/getAll', getAllDriversController);

export default router;