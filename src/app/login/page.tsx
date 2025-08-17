'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  // Handle form submission
  // In a real application, you would send these credentials to your backend for authentication
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for prototype (no real authentication)
    if (username && password) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">লগইন</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ইউজারনেম</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="ইউজারনেম লিখুন"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="পাসওয়ার্ড লিখুন"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            লগইন
          </button>
        </form>
      </div>
    </div>
  );
}