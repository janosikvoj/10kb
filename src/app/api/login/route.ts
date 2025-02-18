import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
    return NextResponse.json(
      { error: 'Username and password are required' },
      { status: 400 }
    );
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      console.error('JWT_SECRET_KEY is not set in environment variables!');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const tokenPayload = {
      isAdmin: true,
      username: username,
    };

    try {
      // 1. Generate JWT using jose
      const secret = new TextEncoder().encode(jwtSecretKey); // Secret key needs to be in Uint8Array format
      const token = await new jose.SignJWT(tokenPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('4h') // Set expiration (e.g., 4 hours)
        .sign(secret);

      // 2. Set JWT as cookie
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'adminSession',
        value: token,
        httpOnly: true,
        path: '/',
        maxAge: 4 * 60 * 60,
        secure: true,
        sameSite: 'strict',
      });

      console.log('Login API (jose): Cookie SET successfully!');
      console.log('Login API (jose): Set cookie value:', token);

      return NextResponse.json({ message: 'Login successful' });
    } catch (error) {
      console.error('JWT signing error (jose):', error);
      return NextResponse.json(
        { error: 'Failed to create JWT' },
        { status: 500 }
      );
    }
  } else {
    console.log('Login API: Authentication FAILED');
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
