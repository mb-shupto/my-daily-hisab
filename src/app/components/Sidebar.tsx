"use client";

import {
  FaHome,
  FaPlus,
  FaMoneyBill,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-64 z-50`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Daily Hisab</h2>
        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <FaHome className="w-6 h-6 text-blue-500" />
            <span className="text-gray-700">ড্যাশবোর্ড</span>
          </Link>
          <Link
            href="/transactions"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            <FaMoneyBill className="w-6 h-6 text-green-500" />
            <span className="text-gray-700">লেনদেন</span>
          </Link>
          <Link
            href="/debts"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
          >
            <FaUser className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-700">পাওনা/দেনা</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            <FaSignOutAlt className="w-6 h-6 text-red-500" />
            <span className="text-gray-700">লগআউট</span>
          </Link>
        </nav>
      </div>
      <button
        type="button"
        title="Toggle sidebar"
        className="md:hidden absolute top-4 right-4 text-gray-600"
        onClick={toggleSidebar}
      >
        <FaPlus className="w-6 h-6 transform rotate-45" />
      </button>
    </div>
  );
}
