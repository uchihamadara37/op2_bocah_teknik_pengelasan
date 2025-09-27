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
import { Service } from '../dataStatic/servicesData';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="">
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
        <h3 data-slot="card-title" className="mb-2 font-semibold flex justify-between">
          {service.title}
          <a href={`/layanan/${encodeURIComponent(service.slug)}`} className="inline-block text-blue-500 hover:underline">
            Detail {'>'}
          </a>
        </h3>
        <CardDescription>{service.description}</CardDescription>

      </CardContent>
    </Card>
  );
}