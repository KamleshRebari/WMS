import Attendance from '../models/Attendance.js';
import Group from '../models/Group.js';

export const getMyAttendance = async (req, res) => {
  const records = await Attendance.find({ workerId: req.user._id }).sort({ date: -1 });
  let location = 'Not assigned';
  if (req.user.groupId) {
    const group = await Group.findById(req.user.groupId);
    if (group) location = group.location;
  }
  res.json({ records, location });
};
