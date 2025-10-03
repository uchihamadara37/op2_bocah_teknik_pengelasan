'use client';

import { useMemo } from 'react';
import { ServiceCard } from './ServiceCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ServiceFirestore } from '@/lib/firebaseBackend/firebaseAdmin';

interface ServiceCarouselProps {
    services: ServiceFirestore[];
}

export function ServiceCarousel({ services }: ServiceCarouselProps) {
    const ITEMS_PER_SLIDE = 6;

    // Kelompokkan data menjadi beberapa slide, masing-masing berisi 6 item
    const groupedServices = useMemo(() => {
        const groups = [];
        for (let i = 0; i < services.length; i += ITEMS_PER_SLIDE) {
            groups.push(services.slice(i, i + ITEMS_PER_SLIDE));
        }
        return groups;
    }, [services]);

    return (
        <Carousel
            opts={{
                align: "start",
                loop: false,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {groupedServices.map((group, index) => (
                    <CarouselItem key={index} className="pl-4">
                        {/* Grid untuk menampilkan 2 baris x 3 kolom */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {group.map((service) => (
                                <ServiceCard key={service.slug} service={service} />
                            ))}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex" />
            <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
    );
}
