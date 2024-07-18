import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#002E5B] w-full py-3 flex items-center justify-center">
      <div></div>
      <p className='text-white'>© {currentYear} Diskominfotik NTB</p>
    </footer>
  );
}
