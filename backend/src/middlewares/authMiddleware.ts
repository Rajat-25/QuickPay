import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, JwtPayloadType } from '../utils';

const JWT_SECRET = process.env.JWT_SECRET!;

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(411).json({ msg: 'User verification failed' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayloadType;
    req.userId = userId;
    if (userId) next();
  } catch (err) {
    return res.status(401).json({ msg: 'User verification failed' });
  }
};

export default authMiddleware;
