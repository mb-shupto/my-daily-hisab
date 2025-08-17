'use client';

import { FaBars, FaHome, FaMoneyBill, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

interface MenubarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function Menubar({ isOpen, toggleMenu }: MenubarProps) {
  return (
    <div className="w-full bg-white shadow-lg z-50">
      <div className="flex items-center justify-between p-8">
        <h2 className="text-xl font-bold text-gray-800">Daily Hisab</h2>
        <button
            type="button"
            title="Toggle menu"
          className="md:hidden text-gray-600"
          onClick={toggleMenu}
        >
          <FaBars className="w-6 h-6" />
        </button>
        <nav
          className={`md:flex md:items-center md:space-x-4 absolute md:static top-12 left-0 w-full bg-white md:bg-transparent md:w-auto md:p-0 p-2 transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaHome className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 text-sm">ড্যাশবোর্ড</span>
            </Link>
            <Link
              href="/transactions"
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-green-100 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaMoneyBill className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 text-sm">লেনদেন</span>
            </Link>
            <Link
              href="/debts"
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaUser className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700 text-sm">দেনা/পাওনা</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-red-100 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaSignOutAlt className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 text-sm">লগআউট</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}