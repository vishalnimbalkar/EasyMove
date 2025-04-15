import express from 'express';
import { getUserDetail, login, register } from '../controllers/authControlle.js';

const router = express.Router();

router.post('/signup/customer', register);
router.post('/login', login);
router.get('/getUser/:email', getUserDetail);

export default router;