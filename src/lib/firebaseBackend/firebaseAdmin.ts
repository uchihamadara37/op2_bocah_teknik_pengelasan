import * as admin from 'firebase-admin';
import { getApps, } from 'firebase-admin/app';

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export type ServiceFirestore = {
  slug: string;
  title: string;
  description: string;
  longDescription: string; // ganti dari fungsi
  images: string[];
};

export const db = admin.firestore();
export const auth = admin.auth();
