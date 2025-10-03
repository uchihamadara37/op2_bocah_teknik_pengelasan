import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth as adminAuth } from '@/lib/firebaseBackend/firebaseAdmin';
import { User } from 'firebase/auth';

export async function GET(req: NextRequest) {
  try {
    // 1. Ambil token dari header Authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];

    // 2. Verifikasi token menggunakan Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // 3. Ambil data pengguna dari Firebase Authentication berdasarkan uid
    const userRecord = await adminAuth.getUser(decodedToken.uid);

    // 4. Kirim kembali data pengguna yang relevan
    return NextResponse.json({ 
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
    } as User);

  } catch (error) {
    console.error('API /me Error:', error);
    // Jika token tidak valid atau kadaluarsa, kirim error
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}