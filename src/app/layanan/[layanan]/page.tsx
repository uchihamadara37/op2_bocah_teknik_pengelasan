import { notFound } from 'next/navigation';
import servicesData from '@/app/dataStatic/servicesData'; 
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import type { Metadata } from 'next';

// Tipe untuk props, 'layanan' sesuai nama folder [layanan]
type Props = {
  params: { layanan: string };
};

// Fungsi untuk generate Metadata SEO secara dinamis
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = servicesData.find(s => s.slug === params.layanan);

  if (!service) {
    return {
      title: 'Layanan Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak tersedia.',
    };
  }

  return {
    title: `${service.title} - Bocah Teknik`,
    description: service.description,
  };
}

// Komponen Halaman
export default function DetailLayananPage({ params }: Props) {
  // Cari data service berdasarkan slug dari URL
  const service = servicesData.find(s => s.slug === params.layanan);

  // Jika service tidak ditemukan, tampilkan halaman 404
  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl pt-4 pb-14 px-4">
      {/* Tombol Kembali */}
      <Link href="/#services" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block">
        &larr; Kembali ke semua layanan
      </Link>

      {/* Judul Utama */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{service.description}</p>

      {/* Galeri Gambar */}
      <div className="mb-12">
        <Carousel className="w-full rounded-lg overflow-hidden">
          <CarouselContent>
            {service.images.map((imageSrc, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video w-full">
                  <Image
                    src={imageSrc}
                    alt={`${service.title} - contoh pengerjaan ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Deskripsi Lengkap */}
      <div className="prose lg:prose-lg max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Informasi Garis Besar Layanan</h2>
        {service.longDescription('mb-4 text-justify indent-8 text-neutral-600')}
        {/* Anda bisa menambahkan lebih banyak detail di sini, seperti daftar material, keunggulan, dll. */}
      </div>

      {/* Tombol Ajakan (Call to Action) */}
      <div className="mt-12 p-6 bg-secondary rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Tertarik dengan Layanan Ini?</h3>
        <p className="text-muted-foreground mb-4">Hubungi kami sekarang untuk konsultasi gratis dan penawaran harga terbaik.</p>
        <Button asChild size="lg" className='bg-green-500 font-semibold'>
          <a href="https://wa.me/6289637606973" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="mr-2 h-5 w-5" />
            Konsultasi via WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
