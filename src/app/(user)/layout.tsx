'use client';

import type { Metadata } from 'next';
import React from 'react';
import Navbar from '../../components/shared/navbar';
import Footer from '@/components/shared/footer';
import { usePathname } from 'next/navigation';

// export const metadata: Metadata = {
//   title: 'Peta | SIG - Lokasi Menara Telekomunikasi',
//   description: 'Sistem Informasi Lokasi Menara Telekomunikasi by DISKOMINFOTIK',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <main>
      <Navbar />
      {children}
      {pathname != '/peta' ? <Footer /> : ''}
    </main>
  );
}
