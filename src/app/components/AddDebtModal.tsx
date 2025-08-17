'use client';

import React, { useState } from 'react';

interface AddDebtModalProps {
  onClose: () => void;
  onAdd: (person: string, amount: number, isOwedToUser: boolean) => void;
}

export default function AddDebtModal({ onClose, onAdd }: AddDebtModalProps) {
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [isOwedToUser, setIsOwedToUser] = useState(true);

  const handleSubmit = () => {
    if (!person || !amount) return;
    onAdd(person, parseFloat(amount), isOwedToUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-black">
        <h2 className="text-xl font-bold mb-4">নতুন পাওনা/দেনা</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            placeholder="ব্যক্তির নাম"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="টাকার পরিমাণ"
            className="w-full p-2 border border-gray-300 rounded-md "
          />
          <select
            title="পাওনা/দেনা"
            value={isOwedToUser ? 'owed' : 'owe'}
            onChange={(e) => setIsOwedToUser(e.target.value === 'owed')}
            className="text-black w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="owed">তারা আমার কাছে পাওনা</option>
            <option value="owe">আমি তাদের কাছে দেনা</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 p-2 rounded-md"
          >
            বাতিল
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white p-2 rounded-md"
          >
            যোগ করুন
          </button>
        </div>
      </div>
    </div>
  );
}