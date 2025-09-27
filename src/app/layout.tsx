import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  title: "Bocah Teknik - Jasa Pengelasan di Yogyakarta",
  description: "Jasa las atau pengelasan profesional untuk folding gate, rolling door, pagar besi, kanopi, dan lainnya. Hubungi kami untuk layanan pengelasan berkualitas tinggi dan amanah di Yogyakarta.",
  // Menambahkan manifest untuk PWA
  manifest: '/site.webmanifest',

  // Memperbarui bagian 'icons' dengan lebih detail
  icons: {
    // Ikon utama untuk browser modern
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      // Anda bisa menambahkan ukuran lain di sini jika ada
      // { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      // { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    // Ikon untuk 'Add to Home Screen' di perangkat Apple
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    // Ikon shortcut (beberapa browser lama mungkin masih menggunakannya)
    shortcut: '/favicon.ico',
  },
  // Menambahkan metadata untuk PWA di Apple
  appleWebApp: {
    title: "BocahTeknik",
    // Anda juga bisa menambahkan 'statusBarStyle' dan 'startupImage' di sini
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
