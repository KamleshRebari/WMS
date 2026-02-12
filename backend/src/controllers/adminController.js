import bcrypt from 'bcryptjs';
import Attendance from '../models/Attendance.js';
import Group from '../models/Group.js';
import Slot from '../models/Slot.js';
import User from '../models/User.js';
import { exportAttendancePdf } from '../services/pdfService.js';

export const getWorkers = async (_req, res) => {
  const workers = await User.find({ role: 'worker' }).select('-password');
  res.json(workers);
};

export const upsertWorker = async (req, res) => {
  const { id, name, mobile, dob, groupId, role = 'worker' } = req.body;
  const username = name.trim().split(' ')[0].toLowerCase();
  if (id) {
    const updated = await User.findByIdAndUpdate(
      id,
      { name, mobile, dob, groupId: groupId || null, role, username },
      { new: true }
    ).select('-password');
    return res.json(updated);
  }
  const hashed = await bcrypt.hash('123456', 10);
  const created = await User.create({
    name,
    mobile,
    dob,
    username,
    password: hashed,
    role,
    groupId: groupId || null
  });
  res.status(201).json(created);
};

export const deleteWorker = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Worker deleted' });
};

export const markAttendance = async (req, res) => {
  const { workerIds, date, slot, location } = req.body;
  const docs = workerIds.map((workerId) => ({
    workerId,
    date,
    slot,
    location,
    status: 'present',
    markedBy: req.user._id
  }));
  const saved = await Attendance.insertMany(docs);
  res.status(201).json(saved);
};

export const getRecords = async (req, res) => {
  const { date, slot, workerId, location } = req.query;
  const filter = {};
  if (date) filter.date = new Date(date);
  if (slot) filter.slot = slot;
  if (workerId) filter.workerId = workerId;
  if (location) filter.location = location;

  const records = await Attendance.find(filter)
    .populate('workerId', 'name username')
    .populate('markedBy', 'name role')
    .sort({ date: -1, createdAt: -1 });

  res.json(records);
};

export const updateRecord = async (req, res) => {
  const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const downloadRecordsPdf = async (req, res) => {
  const records = await Attendance.find({})
    .populate('workerId', 'name')
    .sort({ date: -1 });
  const file = await exportAttendancePdf(records, 'manual-export');
  res.download(file);
};

export const upsertSlot = async (req, res) => {
  const { slotName, startTime, endTime } = req.body;
  const slot = await Slot.findOneAndUpdate(
    { slotName },
    { startTime, endTime },
    { upsert: true, new: true }
  );
  res.json(slot);
};

export const getSlots = async (_req, res) => {
  const slots = await Slot.find({}).sort({ slotName: 1 });
  res.json(slots);
};

export const upsertGroup = async (req, res) => {
  const { id, groupName, supervisorId, location, workers = [] } = req.body;
  const payload = { groupName, supervisorId, location, workers };
  if (id) {
    const group = await Group.findByIdAndUpdate(id, payload, { new: true });
    return res.json(group);
  }
  const group = await Group.create(payload);
  res.status(201).json(group);
};

export const getGroups = async (_req, res) => {
  const groups = await Group.find({})
    .populate('supervisorId', 'name')
    .populate('workers', 'name username');
  res.json(groups);
};
