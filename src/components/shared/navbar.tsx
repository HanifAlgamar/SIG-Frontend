'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { AlignRight, Instagram, Facebook, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white fixed w-full z-40 shadow-sm">
      <nav className="max-w-[80rem] mx-auto px-4 flex items-center justify-between py-4 text-slate-600 ">
        <div className="logo">
          <Link href={'/'}>
            <Image src={'/images/logo.png'} alt="Logo Diskominfotik NTB" width={150} height={50} />
          </Link>
        </div>
        <div
          className={`menu max-md:absolute max-md:py-8 max-md:-z-10 max-md:h-screen max-md:text-center max-md:bg-white max-md:top-[4.2rem] transition-all duration-200 max-md:right-0 max-md:border-t max-md:w-full ${
            isOpen ? 'max-md:block' : 'max-md:opacity-0 max-md:hidden'
          }`}
        >
          <ul className="flex gap-2 items-center max-md:flex-col max-md:gap-10">
            {links.map(({ link, label, path }, index) => (
              <li key={index} className="">
                <Link href={link} className={`px-5 rounded-full font-medium py-2 transition-all hover:bg-blue-200/20 hover:text-black duration-200 ${pathname === label || pathname === path ? '' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
          <div className="cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <AlignRight />
          </div>
        </div>
      </nav>
    </header>
  );
}

const links = [
  {
    link: '/',
    path: '/',
    label: 'Beranda',
  },
  {
    link: '/peta',
    path: '/peta',
    label: 'Peta',
  },
  {
    link: '/laporan',
    path: '/laporan',
    label: 'Lapor Blankspot',
  },
  {
    link: '/dokumentasi',
    path: '/dokumentasi',
    label: 'Dokumentasi',
  },
];
