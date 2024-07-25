'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadioTower, WifiOff, MessageCircleWarning, Check } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ReCAPTCHA from 'react-google-recaptcha';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Laporan {
  count: string;
}

export default function Home() {
  const [dataMenara, setDataMenara] = useState([]);
  const [dataBlankspot, setDataBlankspot] = useState([]);
  const [dataLaporan, setDataLaporan] = useState<Laporan>();

  useEffect(() => {
    fetch('http://localhost:5000/api/towers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDataMenara(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/blankspots')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDataBlankspot(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/reportlength')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDataLaporan(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fadeInUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  });

  return (
    <div className="">
      <div className="">
        <div className="hero w-full h-screen bg-[url('/images/header.jpeg')] relative">
          <div className="bg-[#051D49] bg-opacity-80 h-full w-full text-white flex flex-col text-center items-center justify-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(0)}>
              <motion.h1 className="font-bold text-4xl ">Selamat Datang Di Sistem Informasi Geografis</motion.h1>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(0.5)}>
              <h2 className="mt-2 mb-4 text-slate-200">Menara Telekomunikasi dan Lokasi Blankspot di Provinsi Nusa Tenggara Barat</h2>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(1)}>
              <Link href={'/peta'}>
                <Button className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full py-6 px-10 text-white font-bold">Lihat Peta</Button>
              </Link>
            </motion.div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-md max-w-4xl gap-4 w-full flex justify-between mx-auto shadow-sm px-8 py-4 absolute top-[90%]">
              <div>
                <div className="p-4 gap-2 items-center min-w-64 w-64 flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md shadow-sm text-center">
                  <div className="flex gap-3 items-center">
                    <RadioTower className="bg-white w-max h-max rounded-full p-4 text-slate-600" />
                    <p className="font-bold text-5xl">{dataMenara.length}</p>
                  </div>
                  <div>
                    <p>Menara Telekomunikasi</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="p-4 gap-2 min-w-64 w-64 items-center flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md shadow-sm text-center">
                  <div className="flex gap-3 items-center">
                    <WifiOff className="bg-white w-max h-max rounded-full p-4 text-slate-600" />
                    <p className="font-bold text-5xl">{dataBlankspot.length}</p>
                  </div>
                  <div>
                    <p>Lokasi Blankspot</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="p-4 gap-2 min-w-64 w-64 items-center flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md shadow-sm text-center">
                  <div className="flex gap-3 items-center">
                    <MessageCircleWarning className="bg-white w-max h-max rounded-full p-4 text-slate-600" />
                    <p className="font-bold text-5xl">{dataLaporan?.count}</p>
                  </div>
                  <div>
                    <p>Laporan Diterima</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 max-w-5xl mx-auto px-4">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-slate-700">Layanan</h1>
          <p className="text-slate-500">Berikut adalah layanan yang anda bisa dapatkan</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Image src={'/images/ilustration-1.svg'} alt="Ilustration" width={400} height={100} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm">
              <div className="bg-blue-600 text-white p-2 rounded-full">
                <Check />
              </div>
              <p>Peta Sebaran Menara Telekomunikasi di NTB</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm">
              <div className="bg-blue-600 text-white p-2 rounded-full">
                <Check />
              </div>
              <p>Peta Sebaran Lokasi Blankspot di NTB</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm">
              <div className="bg-blue-600 text-white p-2 rounded-full">
                <Check />
              </div>
              <p>Melaporkan Lokasi Blankspot</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-slate-700">FAQ</h1>
          <p className="text-slate-500">Temukan jawaban anda</p>
        </div>

        <div className="mt-5 bg-white p-6 rounded-md shadow-sm">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger >Apa itu Sistem Informasi Geografis (SIG) Menara Telekomunikasi dan Blankspot?</AccordionTrigger>
              <AccordionContent>SIG Menara Telekomunikasi adalah sistem yang memetakan dan mengelola data geografis menara telekomunikasi dan blankspot di NTB untuk perencanaan infrastruktur yang efisien</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Apa manfaat utama menggunakan SIG untuk manajemen menara?</AccordionTrigger>
              <AccordionContent>SIG membantu dalam perencanaan menara baru, pemantauan menara yang ada, dan peningkatan kualitas jaringan dengan data yang akurat.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Apa saja fitur utama yang disediakan oleh SIG ini?</AccordionTrigger>
              <AccordionContent> Fitur utamanya termasuk pemetaan menara dan pemetaan lokasi blankspot</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-14 mb-10">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-slate-700">Kritik dan Saran</h1>
          <p className="text-slate-500">Lengkapi data berikut untuk mengirimkan kritik dan saran</p>
        </div>

        <div>
          <form action="" className="mt-10 bg-white p-5 rounded-md shadow-sm">
            <div className="flex justify-between w-full gap-4 ">
              <div className="flex flex-col gap-3 w-full">
                <div>
                  <label htmlFor="">Nama</label>
                  <Input className="mt-3" placeholder="Masukan nama lengkap anda" />
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <Input className="mt-3" placeholder="Masukan alamat email anda" type="email" />
                </div>
                <div>
                  <label htmlFor="">No HP</label>
                  <Input className="mt-3" placeholder="Masukan nomor HP aktif anda" />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="">Pesan Anda</label>
                <Textarea className="mt-3" rows={10} placeholder="Masukan pesan anda" />
              </div>
            </div>

            <div className="mt-4">
              <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''} />
            </div>

            <div className="mt-4">
              <Button className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-md py-4 px-10 text-white font-bold w-full">Kirim Pesan</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
