'use client';

import { useEffect, useState, useCallback } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User, onIdTokenChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from './firebaseFrontend/firebaseConfig'; // pastikan ini sudah kamu buat

const AUTH_COOKIE_KEY = 'token';
const COOKIE_EXPIRE_HOURS = 24;
interface AppUser {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

export function useAuth() {
//   const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Login dengan Google
  const login = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // simpan ke cookie 24 jam
      Cookies.set(AUTH_COOKIE_KEY, idToken, {
        expires: COOKIE_EXPIRE_HOURS / 24,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });

      setUser(result.user);
      setToken(idToken);
    } catch (error) {
      console.error('Login gagal:', error);
      throw error;
    }
  }, [auth]);

  // ✅ Logout
  const logout = useCallback(async () => {
    await auth.signOut();
    Cookies.remove(AUTH_COOKIE_KEY);
    setUser(null);
    setToken(null);
  }, [auth]);

  // ✅ Listener perubahan auth
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (!currentUser) {
  //       setUser(null);
  //       setToken(null);
  //       setLoading(false);
  //       return;
  //     }

  //     const idToken = await currentUser.getIdToken();

  //     setUser(currentUser);
  //     setToken(idToken);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  // useEffect(() => {
  //   const unsubscribe = onIdTokenChanged(auth, async (userWithToken) => {
  //     if (userWithToken) {
  //       const idToken = await userWithToken.getIdToken();
  //       setToken(idToken);
  //       Cookies.set(AUTH_COOKIE_KEY, idToken, {
  //           expires: COOKIE_EXPIRE_HOURS / 24,
  //           path: '/',
  //           secure: process.env.NODE_ENV === 'production',
  //           sameSite: 'strict',
  //       });
  //     } else {
  //       setToken(null);
  //       Cookies.remove(AUTH_COOKIE_KEY);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const verifyUserFromCookie = async () => {
      const tokenFromCookie = Cookies.get(AUTH_COOKIE_KEY);

      if (tokenFromCookie) {
        try {
          // Panggil API verifikasi kita
          const response = await fetch('/api/auth', {
            headers: {
              'Authorization': `Bearer ${tokenFromCookie}`,
            },
          });

          if (!response.ok) {
            throw new Error('Verification failed'); // Token tidak valid
          }
          
          const userData: User = await response.json();
          setUser(userData); // Set data pengguna jika token valid

        } catch (error) {
          // Jika verifikasi gagal, hapus cookie yang tidak valid
          console.error("Verification failed, logging out:", error);
          setUser(null);
          setToken(null);
          Cookies.remove(AUTH_COOKIE_KEY);
        }
      }
      
      setLoading(false);
    };

    verifyUserFromCookie();
  }, []);

  return { user, token, loading, login, logout };
}
