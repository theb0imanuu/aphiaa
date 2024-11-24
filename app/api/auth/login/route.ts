import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  
  const token = generateToken(user);
  
  return NextResponse.json({
    message: 'Login successful',
    token,
    role: user.role,
    user: user, 
  });
}

function generateToken(user: User) {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  const token = jwt.sign({ email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
  return token;
}
