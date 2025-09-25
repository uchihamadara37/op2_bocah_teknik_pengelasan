// @/components/ServiceCard.tsx
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Tentukan tipe data untuk props
type Service = {
  title: string;
  description: string;
  images: string[];
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        {/* Carousel Gambar di Dalam Kartu */}
        <Carousel className="w-full rounded-lg overflow-hidden">
          <CarouselContent>
            {service.images.map((imageSrc, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video w-full">
                  <Image
                    src={imageSrc}
                    alt={`${service.title} - gambar ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardTitle className="mb-2">{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardContent>
    </Card>
  );
}