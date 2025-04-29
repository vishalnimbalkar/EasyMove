import express from 'express';
import {getAllCustomersController} from '../controllers/customerController.js'

const router = express.Router();

router.get('/getAll', getAllCustomersController);

export default router;