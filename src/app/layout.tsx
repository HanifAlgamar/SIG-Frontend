import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <head>
        <script defer src="https://app.fastbots.ai/embed.js" data-bot-id="clyicd9lg0017nibc5df3rzjn"></script>
      </head>
      <body className={inter.className}>
        {children}
        <iframe style={{ width: '400px', maxHeight: '600px' }} className="hidden" src="https://app.fastbots.ai/embed/clyicd9lg0017nibc5df3rzjn"></iframe>
      </body>
    </html>
  );
}
