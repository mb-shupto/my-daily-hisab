'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface User {
  email: string;
  password: string;
}
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // Validation
    if (!email || !password) {
      setMessage('ইমেইল এবং পাসওয়ার্ডটি প্রদান করুন।');
      return;
    }

    // Check credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const hashedPassword = await hashPassword(password);
    const user = users.find((u: User) => u.email === email && u.password === hashedPassword);

    if (!user) {
      setMessage('ভুল ইমেইল বা পাসওয়ার্ড প্রদান করেছেন।');
      return;
    }

    // Set auth in localStorage
    localStorage.setItem('auth', JSON.stringify({ email: user.email }));
    setMessage('লগইন সফল হয়েছে!');
    setTimeout(() => router.push('/dashboard'), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">লগইন</h2>
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-500"
              placeholder="ইমেইল লিখুন"
              aria-label="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-500"
              placeholder="পাসওয়ার্ড লিখুন"
              aria-label="Password"
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              aria-label="Login"
            >
              লগইন করুন
            </button>
          </div>
          {message && (
            <p className={`mt-2 text-sm ${message.includes('সফল') ? 'text-green-600' : 'text-red-600'}`} aria-live="polite">
              {message}
            </p>
          )}
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            নিবন্ধন করুন
          </Link>
        </p>
        <br />
        <p className="mt-2 text-sm text-gray-600 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            হোম পেজ এ ফিরে আসুন
          </Link>
          </p>
      </div>
    </div>
  );
}
