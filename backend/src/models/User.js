import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['worker', 'admin', 'supervisor'],
      default: 'worker'
    },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
