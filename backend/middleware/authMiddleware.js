import { verifyToken } from '../utils/jwt.js';

export const requireAdmin = (req, res, next) => {
  const bearerToken = req.headers.authorization?.split(' ')[1];
  const cookieToken = req.cookies?.token;
  const token = bearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== 'admin') throw new Error('Invalid role');
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

