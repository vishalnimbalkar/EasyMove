import express from 'express';
import { addVehicleController, deleteVehicleController, getAllVehiclesController, getVehicleByIdController,updateVehicleController, } from '../controllers/vehicleController.js'

const router = express.Router();

router.get('/getAll', getAllVehiclesController);
router.post('/add', addVehicleController);
router.get('/getById/:driver_id', getVehicleByIdController);
router.post('/update', updateVehicleController);
router.post('/delete/:vehicle_id', deleteVehicleController);

export default router;