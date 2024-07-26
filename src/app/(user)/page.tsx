'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RadioTower, WifiOff, MessageCircleWarning, Check } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ReCAPTCHA from 'react-google-recaptcha';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import toast from 'react-hot-toast';

interface Laporan {
  count: string;
}

export default function Home() {
  const [dataMenara, setDataMenara] = useState([]);
  const [dataBlankspot, setDataBlankspot] = useState([]);
  const [dataLaporan, setDataLaporan] = useState<Laporan>();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, settelepon] = useState('');
  const [pesan, setPesan] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!captchaValue) {
      toast('Mohon untuk melengkapi CAPTCHA', {
        icon: '⚠️',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/kritik', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama,
          email,
          telepon,
          pesan,
          captcha:captchaValue
        }),
      });

      if (!response.ok) {
        toast.error('Kritik Gagal Dikirim, Mohon coba lagi nanti');
        throw new Error('Network response was not ok');
      }

      toast.success('Pesan anda berhasil dikirimkan');
      setNama('');
      setEmail('');
      settelepon('');
      setPesan('');
      setCaptchaValue(null);
      if (recaptchaRef.current) {
        (recaptchaRef.current as ReCAPTCHA).reset();
      }
    } catch (error) {
      toast.error('Kritik Gagal Dikirim, Mohon coba lagi nanti');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  });

  return (
    <main>
      <div className="w-full h-screen bg-[url('/images/header.jpeg')] relative">
        <div className="bg-[#051D49] bg-opacity-80 h-full w-full text-white flex flex-col text-center items-center justify-center">
          <div className="px-4">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(0)}>
              <motion.h1 className="font-bold text-2xl md:text-4xl">Selamat Datang Di Sistem Informasi Geografis</motion.h1>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(0.5)}>
              <h2 className="mt-2 mb-4 text-slate-200 text-sm md:text-lg">Menara Telekomunikasi dan Lokasi Blankspot di Provinsi Nusa Tenggara Barat</h2>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp(1)}>
              <Link href={'/peta'}>
                <Button className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full py-2 px-6 md:py-6 md:px-10 text-white font-bold">Lihat Peta</Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center mx-4 px-4">
          <div className="bg-white rounded-md max-w-4xl gap-4 w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-center justify-center mx-auto shadow-sm px-4 py-4 absolute top-[90%]">
            <div>
              <div className="p-4 gap-2 items-center w-full flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md shadow-sm text-center">
                <div className="flex gap-3 items-center">
                  <RadioTower className="bg-white w-max h-max rounded-full p-2 md:p-4 text-slate-600" />
                  <p className="font-bold text-3xl md:text-5xl">{dataMenara.length}</p>
                </div>
                <div>
                  <p>Menara Telekomunikasi</p>
                </div>
              </div>
            </div>
            <div>
              <div className="p-4 gap-2 items-center w-full flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md shadow-sm text-center">
                <div className="flex gap-3 items-center">
                  <WifiOff className="bg-white w-max h-max rounded-full p-2 md:p-4 text-slate-600" />
                  <p className="font-bold text-3xl md:text-5xl">{dataBlankspot.length}</p>
                </div>
                <div>
                  <p>Lokasi Blankspot</p>
                </div>
              </div>
            </div>
            <div>
              <div className="p-4 gap-2 items-center w-full flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md shadow-sm text-center">
                <div className="flex gap-3 items-center">
                  <MessageCircleWarning className="bg-white w-max h-max rounded-full p-2 md:p-4 text-slate-600" />
                  <p className="font-bold text-3xl md:text-5xl">{dataLaporan?.count}</p>
                </div>
                <div>
                  <p>Laporan Diterima</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:mt-40 md:mt-80 mt-96 max-w-5xl mx-auto px-4">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-slate-700">Layanan</h1>
          <p className="text-slate-500">Berikut adalah layanan yang anda bisa dapatkan</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
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

      <div className="max-w-5xl mx-auto px-4 mt-4">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-slate-700">FAQ</h1>
          <p className="text-slate-500">Temukan jawaban anda</p>
        </div>

        <div className="mt-5 bg-white p-6 rounded-md shadow-sm">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Apa itu Sistem Informasi Geografis (SIG) Menara Telekomunikasi dan Blankspot?</AccordionTrigger>
              <AccordionContent>SIG Menara Telekomunikasi adalah sistem yang memetakan dan mengelola data geografis menara telekomunikasi dan blankspot di NTB untuk perencanaan infrastruktur yang efisien.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Apa manfaat utama menggunakan SIG untuk manajemen menara?</AccordionTrigger>
              <AccordionContent>SIG membantu dalam perencanaan menara baru, pemantauan menara yang ada, dan peningkatan kualitas jaringan dengan data yang akurat.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Apa saja fitur utama yang disediakan oleh SIG ini?</AccordionTrigger>
              <AccordionContent>Fitur utamanya termasuk pemetaan menara dan pemetaan lokasi blankspot.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-14 mb-10">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-slate-700">Kritik dan Saran</h1>
          <p className="text-slate-500">Lengkapi data berikut untuk mengirimkan kritik dan saran</p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="mt-10 bg-white p-5 rounded-md shadow-sm">
            <div className="flex flex-col md:flex-row justify-between w-full gap-4">
              <div className="flex flex-col gap-3 w-full">
                <div>
                  <label htmlFor="nama">Nama</label>
                  <Input className="mt-3" placeholder="Masukan nama lengkap anda" value={nama} onChange={(e) => setNama(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Input className="mt-3" placeholder="Masukan alamat email anda" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="telepon">No HP</label>
                  <Input className="mt-3" type="text" inputMode="numeric" placeholder="Masukan nomor HP aktif anda" value={telepon} onChange={(e) => settelepon(e.target.value)} required />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="pesan">Pesan Anda</label>
                <Textarea className="mt-3 resize-none" rows={10} placeholder="Masukan pesan anda" value={pesan} onChange={(e) => setPesan(e.target.value)} required />
              </div>
            </div>

            <div className="mt-4">
              <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''} onChange={(value) => setCaptchaValue(value)} ref={recaptchaRef}/>
            </div>

            <div className="mt-4">
              <Button className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-md py-4 px-10 text-white font-bold w-full cursor-pointer" disabled={isSubmitting}>
                Kirim Pesan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
