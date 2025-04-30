import express from 'express';
import { getUserDetail, login, register , getUserDetailsById, getDriverDetailsById, checkEamilController} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup/customer', register);
router.post('/login', login);
router.get('/getUser/:email', getUserDetail);
router.get('/getUserById/:customer_id', getUserDetailsById);
router.get('/getDriverById/:driver_id', getDriverDetailsById);
router.post('/checkEmail', checkEamilController);


export default router;