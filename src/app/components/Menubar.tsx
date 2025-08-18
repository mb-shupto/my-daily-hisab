
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MenubarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function Menubar({ isOpen, toggleMenu }: MenubarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daily Hisab</h1>
        <nav className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
            ড্যাশবোর্ড
          </Link>
          <Link href="/transactions" className="text-gray-600 hover:text-blue-600">
            লেনদেন
          </Link>
          <Link href="/debts" className="text-gray-600 hover:text-blue-600">
            পাওনা/দেনা
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600"
            aria-label="Logout"
          >
            লগআউট
          </button>
        </nav>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 hover:text-gray-800"
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
