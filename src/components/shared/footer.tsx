import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full flex flex-col items-center justify-center shadow-sm">
      <div className='bg-white w-full py-6'>
        <div className='max-w-6xl mx-auto px-4 flex md:flex-row items-center flex-col gap-7 justify-between'>
        <Image src={'/images/logo.png'} alt='Logo Diskominfotik' width={150} height={50}/>
        <ul className='flex gap-4'>
          <li>
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href="/peta">Peta</Link>
          </li>
          <li>
            <Link href="/">Lapor Blankspot</Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          <div className="px-1.5 py-1 hover:bg-gradient-to-br from-blue-500 to-blue-600 cursor-pointer hover:text-white transition-all duration-200 rounded-full border border-slate-500">
            <Link href={'/'} className="">
              <Instagram className="w-5" />
            </Link>
          </div>
          <div className="px-1.5 py-1 hover:bg-gradient-to-br from-blue-500 to-blue-600  cursor-pointer hover:text-white transition-all rounded-full border border-slate-500">
            <Link href={'/'}>
              <Facebook className="w-5" />
            </Link>
          </div>
          <div className="px-1.5 py-1 hover:bg-gradient-to-br from-blue-500 to-blue-600  cursor-pointer hover:text-white transition-all rounded-full border border-slate-500">
            <Link href={'/'}>
              <Globe className="w-5" />
            </Link>
          </div>
        </div>
        </div>
      </div>
      <p className='text-white py-2 w-full text-center bg-gradient-to-br hover:bg-blue-400 from-blue-500 to-blue-600 '>© {currentYear} Diskominfotik NTB</p>
    </footer>
  );
}
