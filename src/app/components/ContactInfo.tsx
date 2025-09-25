"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// Anda mungkin perlu menginstal react-icons untuk ikon WA dan IG
// npm install react-icons
import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Phone, Youtube } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { IoLogoYoutube } from 'react-icons/io5';
import { use } from 'react';
import { useViewport } from '@/lib/hooks/useViewport';
import { FaSquareYoutube } from 'react-icons/fa6';

export default function ContactInfo() {
  const isMobile = useViewport().isMobile;
  return (
    <Card id='contact' className="mt-8 mb-14 mx-[10%] text-gray-800 py-0 px-0 border-0 shadow-none">
      <CardContent className="px-0 flex flex-col md:flex-row items-center gap-3 ">

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.8740767973377!2d110.55593206427913!3d-8.011919909486396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb39ca5eef957%3A0x6cb47ad0da4ce63c!2sBOCAH%20TEKNIK!5e0!3m2!1sid!2sid!4v1758762630004!5m2!1sid!2sid" width={isMobile ? "300" : "500"} height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          className='rounded-lg'
        ></iframe>
        <div className="rounded flex flex-col ">
          <div className="flex flex-col bg-white p-3 rounded-md">
            <div className="alamat flex items-center gap-2 mb-1">
              {/* <IoMapSharp className="text-red-500 h-8 w-8" /> */}
              <p className="font-semibold">Alamat:</p>
            </div>
            <p className="text-sm text-left">
              Kedongdowo Wetan RT 18/RW 04, Pampang, Kecamatan Paliyan, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta
            </p>

          </div>
          <div className=" p-3">
            <div className="flex items-center mb-1">
              {/* <FaSquarePhoneFlip className="text-red-500 h-8 w-8 m-3" /> */}
              <div className="flex flex-col">
                <p className="font-semibold">Hubungi Kami:</p>
              </div>
            </div>
            <div className="flex items-start cursor-pointer group"
              onClick={() => {
                window.open('https://wa.me/6289637606973?text=Maaf%20mengganggu,%20benar%20ini%20dengan%20Las%20Bocah%20Teknik?', '_blank');
              }}
            >
              <FaWhatsapp className="text-green-600 h-6 w-6 m-3 group-hover:text-green-500" />
              <div className="flex flex-col">
                <p className="text-md text-green-600 group-hover:text-green-500">WhatsApp</p>
                <p className="text-sm"
                >+62-896-3760-6973 <span className='group-hover:text-green-500'>(click me!)</span></p>
              </div>
            </div>
            <div className="flex items-start cursor-pointer group"
              onClick={() => {
                window.open('https://www.instagram.com/bocahteknik01/?hl=id', '_blank');
              }}
            >
              <FaInstagram className=" h-6 w-6 m-3 text-pink-500" />
              <div className="flex flex-col">
                <p className="text-md text-pink-500">Instagram</p>
                <p className="text-sm">@bocahteknik01 <span className='group-hover:text-pink-500'>(click me!)</span> </p>
              </div>
            </div>
            <div className="flex items-start cursor-pointer group"
              onClick={() => {
                window.open('https://www.youtube.com/@imamnura7044', '_blank');
              }}
            >
              <FaYoutube className="text-red-500 w-11 h-11 m-3" />
              {/* <div className=" h-6 flex justify-center items-center m-3">
                </div> */}
              <div className="flex flex-col">
                <p className="text-md text-red-500">Youtube</p>
                <p className="text-sm">Kunjungi channel Youtube kami untuk informasi lebih lanjut pengerjaan kami.</p>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}