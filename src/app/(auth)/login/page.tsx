import React from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-[#FBD46D] h-screen w-full flex  justify-center items-center">
      <div className="flex  justify-center items-center">
        <div className="bg-white border w-96  px-4 py-5 rounded-md shadow-sm mx-auto">
          <div className="flex justify-center mb-5">
            <Link href={'/'}>
              <Image src={'/images/logo.png'} width={150} height={100} alt="Logo Diskominfotik" />
            </Link>
          </div>
          <form action="" className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="username">Username</label>
              <Input type="text" placeholder="Masukan username anda" className="focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password">Password</label>
              <Input type="password" placeholder="Masukan password anda" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
            </div>

            <div>
              <Button className="w-full bg-[#002E5B]">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
