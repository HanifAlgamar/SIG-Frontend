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
      <iframe style={{ width: '400px', maxHeight: '600px' }} className="hidden" src="https://app.fastbots.ai/embed/clyicd9lg0017nibc5df3rzjn"></iframe>
      <Footer/>
    </main>
  );
}
