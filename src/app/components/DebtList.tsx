'use client';

import React from 'react';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';

interface Debt {
  id: string;
  person: string;
  amount: number;
  isOwedToUser: boolean;
  date: string;
}

interface DebtListProps {
  debts: Debt[];
  onEdit: (id: string, person: string, amount: number, isOwedToUser: boolean) => void;
  onDelete: (id: string) => void;
}

const DebtList: React.FC<DebtListProps> = ({ debts, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-sm mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">আজকের পাওনা/দেনা</h2>
      <div className="bg-white rounded-xl shadow-lg p-4 space-y-4 max-h-80 overflow-y-auto">
        {debts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">কোন পাওনা/দেনা নেই</p>
        ) : (
          debts.map((debt) => (
            <div
              key={debt.id}
              className={`flex items-center p-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.02] ${
                debt.isOwedToUser ? 'bg-blue-50' : 'bg-yellow-50'
              }`}
            >
              <div className={`p-2 rounded-full ${debt.isOwedToUser ? 'bg-blue-200' : 'bg-yellow-200'}`}>
                <FaUser className={`w-5 h-5 ${debt.isOwedToUser ? 'text-blue-600' : 'text-yellow-600'}`} />
              </div>
              <div className="flex-1 ml-4">
                <p className="text-lg font-semibold text-gray-800">{debt.person}</p>
                <p className="text-sm text-gray-500">{new Date(debt.date).toLocaleDateString('bn-BD')}</p>
              </div>
              <p
                className={`text-lg font-bold ${debt.isOwedToUser ? 'text-blue-600' : 'text-yellow-600'}`}
              >
                ৳ {debt.amount.toFixed(2)}
              </p>
              <div className="flex space-x-2 ml-4">
                <button
                  type="button"
                  aria-label="Edit debt"
                  onClick={() => onEdit(debt.id, debt.person, debt.amount, debt.isOwedToUser)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Delete debt"
                  onClick={() => onDelete(debt.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DebtList;