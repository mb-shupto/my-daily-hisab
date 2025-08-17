'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface AddTransactionModalProps {
  onClose: () => void;
  onAdd: (type: 'earning' | 'expense', amount: number, description: string) => void;
}

export default function AddTransactionModal({ onClose, onAdd }: AddTransactionModalProps) {
  const [type, setType] = useState<'earning' | 'expense'>('earning');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

// Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue) && amountValue > 0 && description.trim()) {
      onAdd(type, amountValue, description);
      setAmount('');
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">নতুন লেনদেন</h2>
          <button
            type="button"
            title="Close modal"
           onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">প্রকার</label>
            <select
              aria-label='Transaction type'
              name="type"
              id="type" 
              value={type}
              onChange={(e) => setType(e.target.value as 'earning' | 'expense')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-black"
            >
              <option value="earning">উপার্জন</option>
              <option value="expense">খরচ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium  text-black">পরিমাণ</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-black"
              placeholder="৳ পরিমাণ লিখুন"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">বিবরণ</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-black"
              placeholder="বিবরণ লিখুন"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            যোগ করুন
          </button>
        </form>
      </div>
    </div>
  );
}