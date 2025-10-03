"use client";

import { useEffect, useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ServiceFirestore } from '@/lib/firebaseBackend/firebaseAdmin';
import { useViewport } from '@/lib/hooks/useViewport';
import { Pagination } from './Pagination';

// Komponen placeholder saat data sedang dimuat
function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-gray-200 rounded-xl animate-pulse">
      <div className="aspect-video w-full bg-gray-300 rounded-t-xl"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded mt-4"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded mt-2"></div>
      </div>
    </div>
  );
}

export default function ServiceSection() {
  const [services, setServices] = useState<ServiceFirestore[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { isMobile } = useViewport();
  const ITEMS_PER_PAGE = isMobile ? 2 : 6; // Menampilkan 6 kartu per halaman

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/services?page=${currentPage}&data_count=${ITEMS_PER_PAGE}`, {
          cache: 'no-store', // Selalu ambil data terbaru
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data layanan');
        }

        const result = await response.json();
        setServices(result.data || []);
        setTotalPages(result.metadata.last_page || 1);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Di sini Anda bisa menampilkan toast error jika mau
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [currentPage]); // Jalankan efek ini setiap kali `currentPage` berubah

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="services" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Layanan Unggulan Bocah Teknik</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Berikut adalah beberapa layanan yang kami tawarkan. Gunakan navigasi untuk melihat layanan lainnya.
        </p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {isLoading ? (
          // Tampilkan 6 skeleton saat loading
          Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <ServiceCardSkeleton key={index} />
          ))
        ) : services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))
        ) : (
          // Placeholder jika tidak ada data sama sekali (setelah loading selesai)
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-muted-foreground p-8 border rounded-lg">
            <p>Saat ini belum ada layanan yang tersedia.</p>
          </div>
        )}
      </div>

      {/* Navigasi Paginasi */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

          {/* <Button
            variant="outline"
            size="icon"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          

          <div className="flex items-center gap-2">
            {isMobile && (
              Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => goToPage(pageNumber)}
                  className={currentPage === pageNumber ? 'bg-lime-400 text-black hover:bg-lime-500' : ''}
                >
                  {pageNumber}
                </Button>
              ))
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? 'default' : 'ghost'}
                size="icon"
                onClick={() => goToPage(pageNumber)}
                className={currentPage === pageNumber ? 'bg-lime-400 text-black hover:bg-lime-500' : ''}
              >
                {pageNumber}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button> */}
        </div>
      )}
    </section>
  );
}