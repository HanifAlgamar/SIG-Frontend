import React from 'react';

import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="pt-28 layout min-h-screen ">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Laporan Lokasi Blank Spot</h1>
        <h2>Lengkapi data berikut untuk melaporkan lokasi atau daerah blank spot</h2>
      </div>

      <div>
        <form action="post" className='bg-white p-5 rounded-md shadow-md my-10'>
          <div className="flex md:flex-row flex-col w-full gap-5">
            <div className="flex flex-col gap-[0.55rem] w-full">
              <div className="flex flex-col gap-3">
                <label htmlFor="nama">Nama</label>
                <Input type="text" placeholder="Masukkan nama anda" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <Input type="text" placeholder="Masukkan email anda" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="telepon">Telepon</label>
                <Input type="text" placeholder="Masukkan nomor telepon anda" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="lokasi">Lokasi</label>
                <Input type="text" placeholder="Masukkan lokasi blank spot" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="operator">Operator</label>
                <Input type="text" placeholder="Masukkan nama operator (XL, Telkomsel, dll)" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
              </div>
            </div>
            <div className="w-full h-full">
              <div className="flex flex-col gap-3">
                <label htmlFor="keterangan">Keterangan</label>
                <Textarea placeholder="Masukkan keterangan" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" rows={18} />
              </div>
            </div>
          </div>

          <div>
            <Button className="w-full bg-[#002E5B] hover:bg-[#1a4167] my-5" type="submit">
              Kirim
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
