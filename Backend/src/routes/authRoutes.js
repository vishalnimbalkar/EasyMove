import express from 'express';
import { login, register } from '../controllers/authControlle.js';

const router = express.Router();

router.post('/signup/customer', register);
router.post('/login', login);

export default router;