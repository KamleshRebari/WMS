import Attendance from '../models/Attendance.js';
import Group from '../models/Group.js';

export const getSupervisorWorkers = async (req, res) => {
  const groups = await Group.find({ supervisorId: req.user._id }).populate('workers', 'name username');
  const workers = groups.flatMap((g) => g.workers.map((w) => ({ ...w.toObject(), groupId: g._id, location: g.location })));
  res.json(workers);
};

export const markSupervisorAttendance = async (req, res) => {
  const { workerIds, date, slot, location } = req.body;
  const groups = await Group.find({ supervisorId: req.user._id });
  const allowed = new Set(groups.flatMap((g) => g.workers.map((id) => id.toString())));
  if (!workerIds.every((id) => allowed.has(id))) {
    return res.status(403).json({ message: 'Cannot mark attendance outside your group' });
  }
  const saved = await Attendance.insertMany(
    workerIds.map((workerId) => ({ workerId, date, slot, location, markedBy: req.user._id }))
  );
  res.status(201).json(saved);
};
