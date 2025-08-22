'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface User {
  email: string;
  name: string;
  password: string;
}
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (!email || !name || !password || !confirmPassword) {
      setMessage('সব ক্ষেত্র পূরণ করুন।');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('অবৈধ ইমেইল ফরম্যাট।');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('পাসওয়ার্ড মেলেনি।');
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((user: User) => user.email === email)){
      setMessage('এই ইমেইল ইতিমধ্যে নিবন্ধিত।');
      return;
    }

    // Hash password and save user
    const hashedPassword = await hashPassword(password);
    const newUser = { email, name, password: hashedPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setMessage('নিবন্ধন সফল! লগইন করুন।');
    setTimeout(() => router.push('/login'), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">নিবন্ধন</h2>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              নাম
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg  text-gray-500"
              placeholder="আপনার নাম লিখুন"
              aria-label="Name"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg  text-gray-500"
              placeholder="পাসওয়ার্ড লিখুন"
              aria-label="Password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg  text-gray-500"
              placeholder="পাসওয়ার্ড পুনরায় লিখুন"
              aria-label="Confirm Password"
            />
          </div>
          <div className="flex gap-8">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              aria-label="Register"
            >
              নিবন্ধন করুন 
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="ml-2 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              aria-label="Go to login"
            >
              হোম পেজ এ ফিরে আসুন 
            </button>   
          </div>
          {message && (
            <p className={`mt-2 text-sm ${message.includes('সফল') ? 'text-green-600' : 'text-red-600'}`} aria-live="polite">
              {message}
            </p>
          )}
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            লগইন করুন
          </Link>
        </p>
        <br />
      </div>
    </div>
  );
}
