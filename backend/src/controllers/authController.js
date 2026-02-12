import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/token.js';

const defaultPassword = '123456';

export const registerWorker = async (req, res) => {
  try {
    const { name, mobile, dob } = req.body;
    if (!name || !mobile || !dob) {
      return res.status(400).json({ message: 'Name, mobile and DOB are required.' });
    }

    const username = name.trim().split(' ')[0].toLowerCase();
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: 'Username already exists' });

    const password = await bcrypt.hash(defaultPassword, 10);
    const user = await User.create({
      name,
      mobile,
      dob,
      username,
      password,
      role: 'worker'
    });

    res.status(201).json({
      message: 'Worker registered',
      username: user.username,
      defaultPassword
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username?.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user._id, user.role);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        groupId: user.groupId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
