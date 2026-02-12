import cron from 'node-cron';
import Attendance from '../models/Attendance.js';
import { exportAttendancePdf } from '../services/pdfService.js';

export const startCleanupJob = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const cutoff = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      const stale = await Attendance.find({ createdAt: { $lt: cutoff } }).populate('workerId', 'name');
      if (stale.length) {
        await exportAttendancePdf(stale, 'auto-cleanup');
        await Attendance.deleteMany({ _id: { $in: stale.map((d) => d._id) } });
        console.log(`Cleanup removed ${stale.length} records.`);
      }
    } catch (error) {
      console.error('Cleanup job failed:', error.message);
    }
  });
};
