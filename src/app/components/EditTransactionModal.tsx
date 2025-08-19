'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Transaction {
  id: string;
  type: 'earning' | 'expense';
  amount: number;
  description: string;
  date: string;
}

interface EditTransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
  onEdit: (id: string, type: 'earning' | 'expense', amount: number, description: string) => void;
}

export default function EditTransactionModal({ transaction, onClose, onEdit }: EditTransactionModalProps) {
  const [type, setType] = useState<'earning' | 'expense'>(transaction.type);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [description, setDescription] = useState(transaction.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue) && amountValue > 0 && description.trim()) {
      onEdit(transaction.id, type, amountValue, description);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">লেনদেন সম্পাদনা</h2>
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
                aria-label="Transaction type"
              value={type}
              onChange={(e) => setType(e.target.value as 'earning' | 'expense')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-500"
            >
              <option value="earning">উপার্জন</option>
              <option value="expense">খরচ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">পরিমাণ</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-500"
              placeholder="৳ পরিমাণ লিখুন"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">বিবরণ</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-500"
              placeholder="বিবরণ লিখুন"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
}