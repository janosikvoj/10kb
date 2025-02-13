import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const loginUrl = new URL('/login', request.url);
  console.log('Middleware checking for JWT cookie (jose)...');

  const adminSessionToken = request.cookies.get('adminSession')?.value;

  if (!adminSessionToken) {
    console.log('No adminSession cookie found.');
    return NextResponse.redirect(loginUrl);
  }

  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      console.error('JWT_SECRET_KEY is not set in environment variables!');
      throw new Error('Server configuration error');
    }

    // Verify JWT using jose
    const secret = new TextEncoder().encode(jwtSecretKey);
    const { payload: verifiedToken } = await jose.jwtVerify(
      adminSessionToken,
      secret,
      {
        algorithms: ['HS256'],
      }
    );

    if (!verifiedToken.isAdmin) {
      throw new Error('Not an admin');
    }

    console.log('JWT verification successful (jose). User authenticated.');
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed (jose):', error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: '/admin/:path*',
};
