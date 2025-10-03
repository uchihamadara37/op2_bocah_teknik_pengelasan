'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth'; // Pastikan path ini benar
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc'; // Menggunakan ikon Google dari react-icons
import { Loader2 } from 'lucide-react'; // Ikon untuk loading

export default function LoginPage() {
    const router = useRouter();
    // Menggunakan custom hook Anda untuk otentikasi
    const { user, login, loading } = useAuth();

    // Efek untuk mengalihkan pengguna jika sudah login
    useEffect(() => {
        // Jalankan navigasi hanya jika proses loading selesai dan user ada
        if (user && !loading) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    // Menampilkan loading state layar penuh saat memeriksa status login
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-lime-500" />
            </div>
        );
    }

    // Mencegah "flash" atau kedipan singkat dari form login jika user sudah ada
    // sambil menunggu proses redirect dari useEffect
    if (user) {
         return (
             <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-lime-500" />
                <p className="ml-4 text-muted-foreground">Mengalihkan ke halaman admin...</p>
            </div>
        );
    }

    // Tampilan utama halaman login
    return (
        <div className="flex min-h-screen -mt-20 items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
            <Card className="w-full mt-10 max-w-md z-10 shadow-2xl border-t-8 border-lime-400 rounded-t-2xl">
                <CardHeader className="text-center pt-8">
                    <div className="mx-auto mb-4">
                        <Image
                            src="/logobocahteknik.png" // Ganti dengan path logo Anda
                            alt="Bocah Teknik Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                    <CardTitle className="text-2xl font-bold">Admin Panel Login</CardTitle>
                    <CardDescription>
                        Silakan login menggunakan akun Google Anda untuk melanjutkan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                    <div className="flex flex-col space-y-4 px-6">
                        <Button
                            onClick={login}
                            className="w-full bg-lime-400 text-black hover:bg-lime-500 h-12 text-md font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            <FcGoogle className="mr-3 h-8 w-8" />
                            Login with Google
                        </Button>
                        <p className="text-center text-xs text-gray-500 pt-4">
                            Hanya admin yang terotorisasi yang dapat mengakses halaman ini.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}