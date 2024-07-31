'use client';

import type { Metadata } from 'next';
import React , {useEffect, useState}from 'react';
import Navbar from '../../components/shared/navbar';
import Footer from '@/components/shared/footer';
import { usePathname } from 'next/navigation';
import { Modal } from 'flowbite-react';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setOpenModal(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);
  return (
    <main>
      <Navbar />
      
      <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <TriangleAlert className="mx-auto mb-4 h-14 w-14 text-yellow-300" />
            <h3 className="mb-5 text-lg font-normal text-black">
            Data yang digunakan dalam website ini hanya merupakan data simulasi (dummy) dan bukan data asli yang valid.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)} className='bg-gradient-to-br from-blue-500 to-blue-600 text-white'>
                {"Setuju & Lanjutkan"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {children}
      {pathname != '/peta' ? <Footer /> : ''}
    </main>
  );
}
