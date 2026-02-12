import { Router } from 'express';
import {
  deleteWorker,
  downloadRecordsPdf,
  getGroups,
  getRecords,
  getSlots,
  getWorkers,
  markAttendance,
  updateRecord,
  upsertGroup,
  upsertSlot,
  upsertWorker
} from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
router.use(protect, authorize('admin'));

router.get('/workers', getWorkers);
router.post('/workers', upsertWorker);
router.delete('/workers/:id', deleteWorker);
router.post('/attendance', markAttendance);
router.get('/records', getRecords);
router.put('/records/:id', updateRecord);
router.get('/records/pdf', downloadRecordsPdf);
router.get('/slots', getSlots);
router.post('/slots', upsertSlot);
router.get('/groups', getGroups);
router.post('/groups', upsertGroup);

export default router;
