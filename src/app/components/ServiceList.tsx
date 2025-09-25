// @/components/ServiceSection.tsx
"use client"

import { useState } from 'react';
import servicesData from '../dataStatic/servicesData';
// Import data layanan yang sudah dibuat tadi


import { ServiceCard } from './ServiceCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useViewport } from '@/lib/hooks/useViewport';

// Tentukan jumlah item default
const INITIAL_ITEMS_DESKTOP = 6;
const INITIAL_ITEMS_MOBILE = 3;

export default function ServiceList() {

  const { isMobile } = useViewport(); // <-- 2. Panggil hook di dalam komponen
  const [isExpanded, setIsExpanded] = useState(false);

  // 3. Tentukan jumlah item awal secara dinamis berdasarkan viewport
  const initialItemCount = isMobile ? 3 : 6;

  // Logika untuk menentukan item yang akan ditampilkan
  // Kita akan gunakan INITIAL_ITEMS_DESKTOP sebagai default awal, 
  // dan CSS akan menangani tampilan mobile.
  // Anda bisa membuatnya lebih canggih dengan deteksi viewport jika perlu.
  const itemsToShow = isExpanded ? servicesData.length : initialItemCount;
  
  // Ambil data yang akan di-render
  const visibleServices = servicesData.slice(0, itemsToShow);

  return (
    <section className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Layanan Unggulan Kami</h2>
        <p className="text-muted-foreground mt-2">
          Berikut adalah beberapa layanan yang kami tawarkan, lengkap dengan contoh hasil pengerjaan.
        </p>
      </div>

      {/* Grid Responsif untuk Kartu */}
      {/* Catatan: Batasan 3 item di mobile bisa diatur di sini jika data yang di-slice
        disesuaikan dengan viewport. Untuk simplisitas, contoh ini membatasi data 
        pada 6 item awal, dan sisanya disembunyikan.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleServices.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>

      {/* Tombol Tampilkan Lebih Banyak */}
      {!isExpanded && servicesData.length > INITIAL_ITEMS_DESKTOP && (
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            onClick={() => setIsExpanded(true)}
            className="flex items-center mx-auto group rounded-2xl bg-lime-300 hover:bg-lime-400 text-black"
          >
            Tampilkan Lebih Banyak
            <ChevronDown className="animate-bounce -mb-2 hover h-4 w-4 ml-2 transition-transform" />
          </Button>
        </div>
      )}
      {isExpanded && (
        <div className="mt-12 text-center">
          <Button 
            variant="secondary" 
            onClick={() => setIsExpanded(false)}
            className="group rounded-3xl bg-amber-400 text-slate-700 hover:bg-amber-300"
          >
            Tampilkan Lebih Sedikit
            <ChevronUp className="animate-bounce -mb-1 h-4 w-4 ml-2 transition-transform" />
          </Button>
        </div>
      )}
    </section>
  );
}