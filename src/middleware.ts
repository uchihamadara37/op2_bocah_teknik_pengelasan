import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// Daftar email admin yang diizinkan
const ALLOWED_ADMIN_EMAILS = ['andreamusholin@gmail.com', 'bocahteknik01@example.com', 'imamnura03@gmail.com', 'bagaswidiyanta74@gmail.com'];

/**
 * Memverifikasi Firebase ID Token di Edge Runtime.
 * @param token - Firebase ID Token dari cookie.
 * @returns Payload token yang terdekode jika valid.
 * @throws Error jika token tidak valid.
 */
async function verifyFirebaseToken(token: string) {
  // Buat fungsi pengambil JWK dari endpoint Google JWKS
  const JWKS = jose.createRemoteJWKSet(
    new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
  );

  // Verifikasi token menggunakan jose
  const { payload } = await jose.jwtVerify(token, JWKS, {
    issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`, // Pastikan Anda punya variabel ini di .env.local
    audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });

  return payload;
}

// Fungsi Middleware utama
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;
  const method = req.method;

  if (pathname.startsWith('/api/services')) {
    // Izinkan SEMUA request GET tanpa token
    if (method === 'GET') {
      return NextResponse.next();
    }

    // Untuk method selain GET (POST, PUT, DELETE), wajib ada token valid
    try {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized: Missing or invalid Bearer token' }, { status: 401 });
      }
      const token = authHeader.split('Bearer ')[1];

      const decodedToken = await verifyFirebaseToken(token);
      const userEmail = decodedToken.email as string;

      // Cek apakah email ada di daftar admin yang diizinkan
      if (!ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
        return NextResponse.json({ error: 'Forbidden: You do not have permission to perform this action.' }, { status: 403 });
      }

      // Jika semua pengecekan berhasil, lanjutkan ke API route
      return NextResponse.next();

    } catch (error) {
      console.error('API Auth Error in Middleware:', error);
      return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
    }
  }

  // Halaman yang perlu otentikasi
  const isAdminPath = pathname.startsWith('/admin');

  // Jika tidak ada token dan mencoba akses halaman admin, redirect ke login
  if (!token && isAdminPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Jika ada token
  if (token) {
    try {
      // Verifikasi token
      const decodedToken = await verifyFirebaseToken(token);
      const userEmail = decodedToken.email as string;

      // Cek apakah email ada di daftar admin yang diizinkan
      if (!ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
        // Jika email tidak diizinkan, redirect ke halaman "forbidden" atau login
        console.warn(`Akses ditolak untuk: ${userEmail}`);
        const forbiddenUrl = new URL('/login', req.url);
        forbiddenUrl.searchParams.set('error', 'forbidden');
        return NextResponse.redirect(forbiddenUrl);
      }
      console.log(`Akses diizinkan untuk: ${userEmail}`);
      // Jika email diizinkan dan mencoba akses halaman login, redirect ke admin
      if (pathname === '/login') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }

      // Jika email diizinkan dan akses halaman admin, biarkan
      return NextResponse.next();

    } catch (error) {
      console.error('Token verification failed:', error);
      // Jika token tidak valid (kadaluarsa, dll.) dan mencoba akses halaman admin,
      // redirect ke login sambil menghapus cookie yang tidak valid.
      if (isAdminPath) {
        const loginUrl = new URL('/login', req.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('token'); // Hapus cookie yang salah
        return response;
      }
    }
  }

  // Jika tidak ada kondisi yang cocok, lanjutkan
  return NextResponse.next();
}

// Konfigurasi matcher
export const config = {
  matcher: ['/admin/:path*', '/login'],
};