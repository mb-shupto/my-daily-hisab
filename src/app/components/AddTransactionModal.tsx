'use client';

import React, { useState } from 'react';

interface AddTransactionModalProps {
  onClose: () => void;
  onAdd: (type: 'earning' | 'expense', amount: number, description: string) => void;
}

export default function AddTransactionModal({ onClose, onAdd }: AddTransactionModalProps) {
  const [type, setType] = useState<'earning' | 'expense'>('earning');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!amount || !description) return;
    onAdd(type, parseFloat(amount), description);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl text-black font-bold mb-4">নতুন লেনদেন</h2>
        <div className="space-y-4">
          <select
            title ="Transaction type"
            aria-label="Transaction type"
            value={type}
            onChange={(e) => setType(e.target.value as 'earning' | 'expense')}
            className="text-black w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="earning">উপার্জন</option>
            <option value="expense">খরচ</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="টাকার পরিমাণ"
            className=" text-black w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="বিবরণ"
            className="text-black w-full p-2 border border-gray-300 rounded-md"
          />
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
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            যোগ করুন
          </button>
        </div>
      </div>
    </div>
  );
}