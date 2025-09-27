"use client"
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, PhoneCall } from 'lucide-react'; // Icon dari lucide-react (biasanya sudah terinstall dengan shadcn)
import Image from 'next/image';
import { FaInstagram, FaPhone, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaSquarePhoneFlip } from 'react-icons/fa6';
import { IoLogoYoutube, IoMapSharp } from 'react-icons/io5';

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center w-full text-neutral-700 bg-cover bg-center"
    // style={{ backgroundImage: "url('/wallpaperbetter.jpg')" }} 
    >
      {/* <div className="absolute inset-0 bg-black/50" /> Overlay gelap */}
      <div className="flex flex-col-reverse md:flex-row justify-between relative z-10 max-w-[80%]">
        <div className="md:pt-20 md:max-w-[55%] lg:max-w-[50%]">
          <h1 className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-bold leading-7 md:leading-11 lg:max-w-[80%]">
            <span className="text-amber-500">Bocah Teknik</span>, Jasa Las (Pengelasan) Profesional dan <span className="text-amber-500">Amanah</span>, Baik <span className="text-amber-500">Service</span> Maupun{' '}
            <span className="text-amber-500">Instalasi Baru</span> Di Yogyakarta
          </h1>
          <p className="text-center md:text-left mt-6 mb-10 text-lg md:text-xl ">
            Anda membutuhkan jasa pengelasan seperti pemasangan kanopi, pagar, teralis, atau yang lainnya? Kami, Tim las <span className='font-bold'>Bocah Teknik</span>, siap sedia memberikan layanan pengelasan terbaik untuk rumah maupun bisnis Anda di wilayah Yogyakarta (Jogja) dan sekitarnya.
          </p>

        </div>
        <div className="flex w-full h-60 md:h-auto md:w-[40%] mt-10 relative items-center justify-center">
          <Image
            src="/logobocahteknik.png"
            alt="Logo Bocah Teknik"
            fill={true}
            className="object-contain rounded-lg relative z-10 block"
          />
        </div>
      </div>
      
    </section >
  );
}