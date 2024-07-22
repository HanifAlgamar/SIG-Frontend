import type { Metadata } from 'next';
import React from 'react';
import Navbar from '../../components/shared/navbar'
import Footer from '@/components/shared/footer';

export const metadata: Metadata = {
  title: 'SIG - Lokasi Menara Telekomunikasi',
  description: 'Sistem Informasi Lokasi Menara Telekomunikasi by DISKOMINFOTIK',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      {/* <Footer/> */}
    </main>
  );
}
