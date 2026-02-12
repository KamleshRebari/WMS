import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { getSupervisorWorkers, markSupervisorAttendance } from '../controllers/supervisorController.js';

const router = Router();
router.use(protect, authorize('supervisor'));
router.get('/workers', getSupervisorWorkers);
router.post('/attendance', markSupervisorAttendance);

export default router;
