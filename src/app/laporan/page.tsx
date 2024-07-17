import React from 'react';

import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

export default function Page() {
  return (
    <div className="pt-28 layout">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Laporan Lokasi Blank Spot</h1>
        <h2>Lengkapi data berikut untuk melaporkan lokasi atau daerah blank spot</h2>
      </div>

      <div>
        <form action="" className="flex w-full gap-5 mt-10">
          <div className="flex flex-col gap-[0.65rem] w-full">
            <div className="flex flex-col gap-3">
              <label htmlFor="nama">Nama</label>
              <Input type="text" placeholder="Masukkan nama anda" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Email</label>
              <Input type="text" placeholder="Masukkan email anda" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="nama">Telepon</label>
              <Input type="text" placeholder="Masukkan nomor telepon anda" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="nama">Lokasi</label>
              <Input type="text" placeholder="Masukkan lokasi blank spot" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
            </div>
          </div>
          <div className="w-full h-full">
            <div className="flex flex-col gap-3">
              <label htmlFor="keterangan">Keterangan</label>
              <Textarea placeholder="Masukkan keterangan" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" rows={14} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
