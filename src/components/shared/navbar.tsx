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
    <header className="primary-color fixed w-full z-40">
      <nav className="max-w-[80rem] mx-auto px-4 flex items-center justify-between py-4">
        <div className="logo">
          <Link href={'/'}>
            <Image src={'/images/logo.png'} alt="Logo Diskominfotik NTB" width={150} height={50} />
          </Link>
        </div>
        <div
          className={`menu max-md:absolute max-md:py-8 max-md:-z-10 max-md:h-screen max-md:text-center max-md:bg-[#FBD46D] max-md:top-[4.2rem] transition-all duration-200 max-md:right-0 max-md:border-t max-md:w-full ${
            isOpen ? 'max-md:block' : 'max-md:opacity-0'
          }`}
        >
          <ul className="flex gap-2 items-center max-md:flex-col max-md:gap-10">
            {links.map(({ link, label, path }, index) => (
              <li key={index}>
                <Link href={link} className={`hover:bg-[#002E5B] hover:text-white px-5 rounded-full py-1.5 transition-all duration-200 ${pathname === label || pathname === path ? ' text-white bg-[#002E5B]' : ''}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 items-center">
          <div className="px-1.5 py-1 hover:bg-[#002E5B] cursor-pointer hover:text-white transition-all duration-200 rounded-full border border-black">
            <Link href={'/'} className="">
              <Instagram className="w-5" />
            </Link>
          </div>
          <div className="px-1.5 py-1 hover:bg-[#002E5B]  cursor-pointer hover:text-white transition-all rounded-full border border-black">
            <Link href={'/'}>
              <Facebook className="w-5" />
            </Link>
          </div>
          <div className="px-1.5 py-1 hover:bg-[#002E5B]  cursor-pointer hover:text-white transition-all rounded-full border border-black">
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
    link: '/tentang',
    path: '/tentang-kami',
    label: 'Tentang Kami',
  },
];
