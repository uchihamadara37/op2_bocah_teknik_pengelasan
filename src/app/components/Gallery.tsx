import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

const galleryItems = [
  {
    src: '/path-to-folding-gate.jpg', // Ganti dengan path gambar Anda
    alt: 'Folding Gate',
    title: 'Folding Gate',
  },
  // Tambahkan item lain di sini jika ada
  // { src: '/path-to-another-image.jpg', alt: 'Produk Lain', title: 'Produk Lain' }
];

export default function Gallery() {
  return (
    <section id="product" className="container mx-auto py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Berikut adalah beberapa <span className="text-blue-600">contoh produk</span> dan{' '}
        <span className="text-blue-600">hasil pengelasan</span> kami.
      </h2>
      <Carousel className="w-full max-w-2xl mx-auto">
        <CarouselContent>
          {galleryItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-video items-center justify-center p-0 relative">
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      fill 
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 bg-black/50 w-full p-2 text-center">
                      <span className="font-bold text-lg text-white">{item.title}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}