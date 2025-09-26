import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Sesuaikan path jika berbeda
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="bg-lime-300 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container md:max-w-[80%] mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Image src="/icon_bocahteknik.png" alt="Logo" width={35} height={35} />
          <h1 className="text-xl font-semibold text-gray-800">
            Bocah Teknik
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" asChild>
            <Link href="#product">Product</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#services">Our Service</Link>
          </Button> */}
          <Button 
            variant="secondary"
          asChild>
            <Link href="#contact" className='font-semibold'>Kontak kami</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}