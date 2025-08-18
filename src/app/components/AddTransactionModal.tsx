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
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0 || !description.trim()) {
      setMessage('অবৈধ ইনপুট। পরিমাণ এবং বিবরণ সঠিকভাবে প্রদান করুন।');
      return;
    }

    onAdd(type, amountValue, description);
    setType('earning');
    setAmount('');
    setDescription('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">নতুন লেনদেন</h2>
          <button
            type="button"
            title="Close modal"
            aria-label="Close modal"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              প্রকার
            </label>
            <select
              id="type"
              name="type"
              aria-label="Transaction type"
              value={type}
              onChange={(e) => setType(e.target.value as 'earning' | 'expense')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-black"
            >
              <option value="earning">উপার্জন</option>
              <option value="expense">খরচ</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              পরিমাণ
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-black"
              placeholder="৳ পরিমাণ লিখুন"
              min="0"
              step="0.01"
              aria-label="Transaction amount"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              বিবরণ
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="বিবরণ লিখুন"
              aria-label="Transaction description"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              aria-label="Add transaction"
            >
              যোগ করুন
            </button>
          </div>
          {message && (
            <p className="mt-2 text-sm text-red-600" aria-live="polite">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
