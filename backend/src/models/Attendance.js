import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    slot: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ['present', 'absent'], default: 'present' },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

attendanceSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 * 24 * 60 * 60 });

export default mongoose.model('Attendance', attendanceSchema);
