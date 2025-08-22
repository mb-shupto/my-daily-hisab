'use client';

import React, { useState, useEffect } from 'react';
import Menubar from '../../components/Menubar';
import EditProfileModal from '../../components/EditProfilleModal';
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (auth) {
      const activeUserId = JSON.parse(auth).id;
      const currentUser = users.find((u: User) => u.id === activeUserId);
      setUser(currentUser || null);
    }
  }, []);

  const handleEditProfile = (updatedUser: User) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser(updatedUser);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Menubar isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">প্রোফাইল</h1>
          {user ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">ইউজারনেম</p>
                <p className="text-lg text-gray-800">{user.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">ইমেইল</p>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">পাসওয়ার্ড</p>
                <p className="text-lg text-gray-800">••••••••</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center"
                  aria-label="Back"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  ফিরে যান
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  aria-label="Edit Profile"
                >
                  প্রোফাইল সম্পাদনা
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">কোনো ব্যবহারকারী লোড হয়নি। দয়া করে লগইন করুন।</p>
          )}
        </div>
        {isEditModalOpen && user && (
          <EditProfileModal
            user={user}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEditProfile}
          />
        )}
      </div>
    </div>
  );
}
