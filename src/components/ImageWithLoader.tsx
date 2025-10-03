'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ImageWithLoader(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // Kontainer untuk menampung loader dan gambar
    <div className="relative h-full w-full bg-gray-200 dark:bg-gray-800">
      {/* Tampilkan loader jika isLoading adalah true */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Komponen Image dari Next.js */}
      <Image
        {...props} // Teruskan semua props (src, alt, fill, dll.)
        // Panggil fungsi ini saat gambar selesai dimuat
        onLoadingComplete={() => setIsLoading(false)}
        className={cn(
          props.className,
          'transition-opacity duration-500', // Efek fade-in
          isLoading ? 'opacity-0' : 'opacity-100' // Sembunyikan gambar saat loading
        )}
      />
    </div>
  );
}