import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { startCleanupJob } from './jobs/cleanupJob.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import supervisorRoutes from './routes/supervisorRoutes.js';
import workerRoutes from './routes/workerRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/supervisor', supervisorRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  startCleanupJob();
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
});
