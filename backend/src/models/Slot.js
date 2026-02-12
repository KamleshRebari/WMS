import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema(
  {
    slotName: { type: String, required: true, unique: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Slot', slotSchema);
