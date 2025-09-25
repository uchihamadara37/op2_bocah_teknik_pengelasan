'use client'; // Hook ini butuh browser APIs, jadi harus client-side

import { useState, useEffect } from 'react';

// Tentukan breakpoint yang umum (sesuaikan dengan Tailwind CSS jika perlu)
const breakpoints = {
  sm: 640,  // mobile
  md: 768,  // tablet
  lg: 1024, // desktop
  xl: 1280,
};

export function useViewport() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Pastikan kode ini hanya berjalan di client-side
    // karena 'window' tidak ada saat Server-Side Rendering (SSR)
    if (typeof window === 'undefined') {
      return;
    }

    // Fungsi untuk update state saat jendela di-resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Daftarkan event listener
    window.addEventListener('resize', handleResize);

    // Panggil sekali saat komponen pertama kali mount untuk mendapat ukuran awal
    handleResize();

    // Hapus event listener saat komponen di-unmount (penting!)
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali

  const { width } = windowSize;

  return {
    width,
    height: windowSize.height,
    isMobile: width < breakpoints.md,     // Lebar < 768px
    isTablet: width >= breakpoints.md && width < breakpoints.lg, // Lebar >= 768px dan < 1024px
    isDesktop: width >= breakpoints.lg,  // Lebar >= 1024px
  };
}