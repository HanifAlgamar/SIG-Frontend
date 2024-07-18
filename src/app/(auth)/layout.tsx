import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | SIG - Lokasi Menara Telekomunikasi',
  description: 'Sistem Informasi Lokasi Menara Telekomunikasi by DISKOMINFOTIK',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
