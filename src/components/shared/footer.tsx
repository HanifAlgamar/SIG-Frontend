import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-br hover:bg-blue-400 from-blue-500 to-blue-600 w-full py-3 flex items-center justify-center">
      <div></div>
      <p className='text-white'>© {currentYear} Diskominfotik NTB</p>
    </footer>
  );
}
