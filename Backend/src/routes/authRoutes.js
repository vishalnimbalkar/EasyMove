import express from 'express';
import { getUserDetail, login, register, register2, getUserDetailsById, getDriverDetailsById, checkEamilController, updateUserController} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup/customer', register);
router.post('/signup/driver', register2);
router.post('/login', login);
router.get('/getUser/:email', getUserDetail);
router.get('/getUserById/:customer_id', getUserDetailsById);
router.get('/getDriverById/:driver_id', getDriverDetailsById);
router.post('/checkEmail', checkEamilController);
router.post('/updateUser', updateUserController);


export default router;