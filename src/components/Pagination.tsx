'use client';

import { Button } from '@/components/ui/button';
import { useViewport } from '@/lib/hooks/useViewport';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Fungsi untuk menghitung rentang halaman yang akan ditampilkan
  const { isMobile } = useViewport();
  const getPaginationRange = (): number[] => {
    const maxVisiblePages = isMobile ? 3 : 7; // Jumlah maksimum tombol halaman yang ditampilkan

    // Kasus 1: Jika total halaman 4 atau kurang, tampilkan semua
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Kasus 2: Logika sliding window
    let startPage: number;

    if (currentPage <= 2) {
      // Jika di awal (halaman 1 atau 2)
      startPage = 1;
    } else if (currentPage >= totalPages - 1) {
      // Jika di akhir (dua halaman terakhir)
      startPage = totalPages - maxVisiblePages + 1;
    } else {
      // Jika di tengah
      startPage = currentPage - 1;
    }
    
    const endPage = startPage + maxVisiblePages - 1;
    
    // Buat array dari startPage ke endPage
    return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
  };

  const pageNumbers = getPaginationRange();

  return (
    <div className="mt-12 flex justify-center items-center gap-2 md:gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className='border border-lime-500'
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        {pageNumbers.map(pageNumber => (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onPageChange(pageNumber)}
            className={currentPage === pageNumber ? 'bg-lime-400 text-black hover:bg-lime-500 pointer-events-none' : ''}
          >
            {pageNumber}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className='border border-lime-500' 
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
