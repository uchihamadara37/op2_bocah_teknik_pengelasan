'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth'; // Pastikan path ini benar
import ServiceForm, { ServiceFormData } from '@/components/admin/ServiceForm'; // Asumsi komponen ini sudah ada
import ServicesTable from '@/components/admin/ServicesTable'; // Asumsi komponen ini sudah ada
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ServiceFirestore } from '@/lib/firebaseBackend/firebaseAdmin';

export default function AdminPage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  // State untuk me-refresh tabel setelah ada perubahan data
  const [refreshTable, setRefreshTable] = useState(false);
  // State untuk menyimpan data layanan yang dipilih untuk diedit
  const [selectedService, setSelectedService] = useState<ServiceFormData | null>(null);

  // Efek untuk melindungi halaman, mengalihkan jika belum login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fungsi yang dipanggil setelah form berhasil disubmit
  const handleSuccess = () => {
    console.log('Form submitted successfully');
    setRefreshTable((prev) => !prev); // Memicu refresh pada tabel
    setSelectedService(
      { slug: '', title: '', description: '', longDescription: '', images: [], imageUrlEdited: [] }
    ); 
  };

  // Fungsi yang dipanggil saat sebuah baris di tabel diklik
  const handleRowClick = (serviceData: any) => {
    setSelectedService(serviceData);
    // Scroll ke atas agar form edit terlihat
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Menampilkan loading state layar penuh
  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-lime-500" />
      </div>
    );
  }

  if (user.photoURL) {  
    console.log('User Photo URL:', user.photoURL);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
      <header className="container mx-auto max-w-7xl flex justify-between items-center mb-8 pb-4 border-b">
        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <Image src={user.photoURL} alt="Admin" width={40} height={40} className="rounded-full" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-gray-500" />
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">Selamat Datang,</p>
            <p className='font-semibold'>{user?.displayName || user?.email}</p>
          </div>
        </div>
        <Button onClick={logout} variant="outline" size="sm" className="group">
          <LogOut className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Logout
        </Button>
      </header>

      <main className="container mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Kolom Form */}
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <Card className="sticky top-24 shadow-md">
              <CardHeader>
                <CardTitle>{selectedService && selectedService.slug != '' ? <span className='text-blue-500'>Edit Layanan</span> : <span className='text-lime-500'>Tambah Layanan Baru</span>}</CardTitle>
                <CardDescription>
                  {selectedService && selectedService.slug != '' ? 'Perbarui detail layanan yang sudah ada.' : 'Isi form untuk menambahkan layanan baru.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceForm
                  onSuccess={handleSuccess}
                  initialData={selectedService}
                  key={selectedService ? selectedService.id : 'new'} // Key untuk mereset form
                />
              </CardContent>
            </Card>
          </div>

          {/* Kolom Tabel */}
          <div className="lg:col-span-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Daftar Layanan</CardTitle>
                <CardDescription>Klik pada tombol edit di bawah untuk mengedit data layanan pada formulir yang sudah ada.</CardDescription>
              </CardHeader>
              <CardContent>
                <ServicesTable
                  refresh={refreshTable}
                  onRowClick={handleRowClick}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
