
'use client';

import React from 'react';
import NotificationBell from './NotificationBell';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaTachometerAlt, FaMoneyBill, FaHandHoldingUsd, FaSignOutAlt } from 'react-icons/fa';

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
    <header className="bg-white shadow p-4 w-full mt-0'">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-gray-800">Daily Hisab</h1>
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 px-4 py-2 rounded transition-colors">
            <FaTachometerAlt className="w-5 h-5" />
            <span>ড্যাশবোর্ড</span>
          </Link>
          <Link href="/transactions" className="flex items-center gap-2 text-gray-600 hover:text-lime-600 px-4 py-2 rounded transition-colors">
            <FaMoneyBill className="w-5 h-5" />
            <span>লেনদেন</span>
          </Link>
          <Link href="/debts" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 px-4 py-2 rounded transition-colors">
            <FaHandHoldingUsd className="w-5 h-5" />
            <span>পাওনা/দেনা</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 px-4 py-2 rounded transition-colors"
            aria-label="Logout"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>লগআউট</span>
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
