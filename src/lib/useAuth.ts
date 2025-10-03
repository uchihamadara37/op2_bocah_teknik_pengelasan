'use client';

import { useEffect, useState, useCallback } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from './firebaseFrontend/firebaseConfig'; // pastikan ini sudah kamu buat

const AUTH_COOKIE_KEY = 'token';
const COOKIE_EXPIRE_HOURS = 24;

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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      const idToken = await currentUser.getIdToken();
      Cookies.set(AUTH_COOKIE_KEY, idToken, {
        expires: COOKIE_EXPIRE_HOURS / 24,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });

      setUser(currentUser);
      setToken(idToken);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, token, loading, login, logout };
}
