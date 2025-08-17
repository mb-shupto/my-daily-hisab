"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Debt {
  id: string;
  person: string;
  amount: number;
  isOwedToUser: boolean;
  date: string;
}

interface EditDebtModalProps {
  debt: Debt;
  onClose: () => void;
  onEdit: (
    id: string,
    person: string,
    amount: number,
    isOwedToUser: boolean
  ) => void;
}

export default function EditDebtModal({
  debt,
  onClose,
  onEdit,
}: EditDebtModalProps) {
  const [person, setPerson] = useState(debt.person);
  const [amount, setAmount] = useState(debt.amount.toString());
  const [isOwedToUser, setIsOwedToUser] = useState(debt.isOwedToUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue) && amountValue > 0 && person.trim()) {
      onEdit(debt.id, person, amountValue, isOwedToUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            পাওনা/দেনা সম্পাদনা
          </h2>
          <button
            type="button"
            title="Close modal"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ব্যক্তি
            </label>
            <input
              type="text"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="ব্যক্তির নাম লিখুন"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              পরিমাণ
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="৳ পরিমাণ লিখুন"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              প্রকার
            </label>
            <select
              aria-label="Debt type"
              value={isOwedToUser ? "owedToUser" : "owedByUser"}
              onChange={(e) => setIsOwedToUser(e.target.value === "owedToUser")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="owedToUser">পাওনা (আমার কাছে)</option>
              <option value="owedByUser">দেনা (আমি দিতে)</option>
            </select>
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
