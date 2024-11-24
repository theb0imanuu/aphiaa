import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function getUserFromCookie(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return null;
  }
}
