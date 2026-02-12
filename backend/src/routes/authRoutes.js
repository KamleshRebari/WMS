import { Router } from 'express';
import { login, registerWorker } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerWorker);
router.post('/login', login);

export default router;
