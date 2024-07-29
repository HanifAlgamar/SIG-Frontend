'use client';

import React, { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Store the token in local storage
      localStorage.setItem('token', data.token);

      // Redirect to the dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="bg-white border w-96 px-4 py-5 rounded-md shadow-sm mx-auto">
          <div className="flex justify-center mb-5">
            <Link href={'/'}>
              <Image src={'/images/logo.png'} width={150} height={100} alt="Logo Diskominfotik" />
            </Link>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="username">Username</label>
              <Input type="text" placeholder="Masukan username anda" value={username} onChange={(e) => setUsername(e.target.value)} className="" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password">Password</label>
              <Input type={showPassword ? 'text' : 'password'} placeholder="Masukan password anda" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
            </div>

            <div className='flex items-center gap-3'>
              <input type="checkbox" onChange={handleShowPassword} />
              <p>Tampilkan Password</p>
            </div>

            <div>
              <Button type="submit" className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white py-2 rounded-md" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>

            {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
