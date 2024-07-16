'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { AlignRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, settIsopen] = useState(false);

  return (
    <header className="primary-color z-10 fixed w-full">
      <nav className="layout flex items-center justify-between py-4">
        <div className="logo">
          <Link href={'/'}>
            <Image src={'/images/logo.png'} alt="Logo Diskominfotik NTB" width={150} height={50} />
          </Link>
        </div>
        <div
          className={`menu max-md:absolute max-md:py-8 max-md:-z-10  max-md:text-center max-md:bg-[#FBD46D] max-md:top-[4.2rem] transition-all  duration-200 max-md:border-t max-md:w-full max-md:left-0 ${
            isOpen ? 'max-md:block' : 'max-md:-top-64'
          } `}
        >
          <ul className="flex gap-2 items-center max-md:flex-col max-md:gap-6">
            {links.map(({ link, label }, index) => (
              <li key={index}>
                <Link href={link} className="hover:bg-[#002E5B] hover:text-white px-6 rounded-full py-2 transition-all duration-200">
                  {label}
                </Link>
              </li>
            ))}
            <Button variant={'default'} className="bg-[#002E5B] md:hidden w-max  hover:bg-[#002e5b] hover:bg-opacity-90  rounded-full text-white px-8">
            Login
          </Button>
          </ul>
        </div>
        <div className="max-md:hidden">
          <Button variant={'default'} className="bg-[#002E5B] hover:bg-[#002e5b] hover:bg-opacity-90  rounded-full text-white px-8">
            Login
          </Button>
        </div>

        <div className="cursor-pointer md:hidden" onClick={() => settIsopen(!isOpen)}>
          <AlignRight />
        </div>
      </nav>
    </header>
  );
}

const links = [
  {
    link: '/',
    label: 'Beranda',
  },
  {
    link: '/laporan',
    label: 'Laporan',
  },
  {
    link: '/about',
    label: 'About',
  },
];
