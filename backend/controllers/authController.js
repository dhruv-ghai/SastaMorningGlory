import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';
import { env } from '../config/env.js';

const HARDCODED_USER = {
  username: 'admin',
  password: '12345678'
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const isValidUser = username === HARDCODED_USER.username && password === HARDCODED_USER.password;

  if (!isValidUser) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ username, role: 'admin' });
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.cookieSecure,
    maxAge: 60 * 60 * 1000
  };

  res
    .cookie('token', token, cookieOptions)
    .json({ token, expiresIn: 3600, user: { username, role: 'admin' } });
};

