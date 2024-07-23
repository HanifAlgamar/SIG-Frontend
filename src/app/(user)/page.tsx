'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
});

export default function Home() {
  return (
    <div className="">
      <div className="">
        <div className="hero w-full h-screen bg-[url('/images/header.jpeg')]">
          <div className="bg-[#002E5B] bg-opacity-80 h-full w-full text-white flex flex-col text-center items-center justify-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(0)}>
              <motion.h1 className="font-bold text-4xl">Selamat Datang Di Sistem Informasi Geografis</motion.h1>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(0.5)}>
              <h2 className="mt-2 mb-4">Menara Telekomunikasi dan Lokasi Blankspot di Provinsi Nusa Tenggara Barat</h2>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(1)}>
              <Link href={'/peta'}>
                <Button className="bg-[#FBD46D] rounded-full py-6 px-10 text-black font-bold hover:bg-[#ffde84]">Lihat Peta</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
