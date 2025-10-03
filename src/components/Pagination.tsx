'use client';

import { Button } from '@/components/ui/button';
import { useViewport } from '@/lib/hooks/useViewport';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Fungsi untuk menghitung rentang halaman yang akan ditampilkan

  const { isMobile } = useViewport();
  const [maxVisiblePages, setMaxVisiblePages] = useState<number>(isMobile ? 4 : 7); // Jumlah maksimum halaman yang ditampilkan
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    // toast.success(`Mode tampilan: ${isMobile ? 'Mobile' : 'Desktop'}`, { duration: 2000 });
    setMaxVisiblePages(isMobile ? 4 : 7);
    if (currentPage > totalPages) {
      onPageChange(totalPages);
      // toast(`Halaman diubah ke ${totalPages} karena melebihi total halaman`, { duration: 3000 });
    }
  }, [isMobile]);
  
  useEffect(() => {
    const getPaginationRange = (): number[] => {

      // Kasus 1: Jika total halaman 4 atau kurang, tampilkan semua
      if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // Kasus 2: Logika sliding window
      let startPage: number;

      if (currentPage <= 2) {
        console.log("jangkrik 1")
        // Jika di awal (halaman 1 atau 2)
        startPage = 1;
      } else if (currentPage >= totalPages - 1) {
        console.log("jangkrik 2")
        // Jika di akhir (dua halaman terakhir)
        startPage = totalPages - maxVisiblePages + 1;
      } else {
        console.log("jangkrik 3")
        // Jika di tengah
        startPage = currentPage - 1;
      }
      //              1 + 4 -1 
      const endPage = startPage + maxVisiblePages - 1;
      console.log("jika totalPages>",{ totalPages, maxVisiblePages, startPage, endPage });
      // Buat array dari startPage ke endPage
      return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
    };
    const pageNums = getPaginationRange();
    setPageNumbers(pageNums);
    console.log("Pagination updated:", {totalPages, maxVisible: pageNums.length, isMobile });

  }, [maxVisiblePages, currentPage, totalPages]);

  // cek setiap render
  // console.log("isMobile.",{ isMobile });
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4">
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
