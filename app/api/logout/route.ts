import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const headers = new Headers();
    headers.set('Set-Cookie', 'token=; Max-Age=0; path=/;');

    return NextResponse.json({ message: 'Logout successful' }, { headers });
  } catch {
    return NextResponse.json({ message: 'An error occurred during logout' }, { status: 500 });
  }
}
