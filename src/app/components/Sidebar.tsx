'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes, FaBars } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden text-gray-600 hover:text-gray-800 p-4 fixed top-0 left-0 z-50"
        aria-label="Toggle sidebar"
      >
        <FaBars className="w-6 h-6" />
      </button>
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:w-64 w-3/4 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">মেনু</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close sidebar"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => router.push('/profile')}
                className="w-full text-left px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                aria-label="Go to profile"
              >
                প্রোফাইল
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full text-left px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                aria-label="Go to dashboard"
              >
                ড্যাশবোর্ড
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/categories')}
                className="w-full text-left px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                aria-label="Go to category summary"
              >
                ক্যাটাগরি সারাংশ
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-600 hover:bg-red-100 hover:text-red-600"
                aria-label="Logout"
              >
                লগআউট
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}