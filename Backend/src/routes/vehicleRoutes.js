import express from 'express';
import { addVehicleController, deleteVehicleController, getAllVehiclesController, getVehicleByIdController,updateVehicleController, getByVehicleIdController} from '../controllers/vehicleController.js'

const router = express.Router();

router.get('/getAll', getAllVehiclesController);
router.post('/add', addVehicleController);
router.get('/getById/:driver_id', getVehicleByIdController);
router.get('/getByVehicleId/:vehicle_id', getByVehicleIdController);
router.patch('/update', updateVehicleController);
router.delete('/delete/:vehicle_id', deleteVehicleController);

export default router;