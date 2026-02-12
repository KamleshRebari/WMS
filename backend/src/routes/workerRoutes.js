import { Router } from 'express';
import { getMyAttendance } from '../controllers/workerController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
router.use(protect, authorize('worker'));
router.get('/attendance', getMyAttendance);

export default router;
