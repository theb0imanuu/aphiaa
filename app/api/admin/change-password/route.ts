import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    return NextResponse.json({ message: 'Password updated successfully' });
  } catch {
    // Removed `error` since it's unused
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
