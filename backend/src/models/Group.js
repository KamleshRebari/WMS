import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true, unique: true },
    supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    location: { type: String, required: true },
    workers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export default mongoose.model('Group', groupSchema);
