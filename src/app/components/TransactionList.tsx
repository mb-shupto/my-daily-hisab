'use client';

import React from 'react';
import { FaMoneyBill, FaShoppingBag, FaEdit, FaTrash } from 'react-icons/fa';

interface Transaction {
  id: string;
  type: 'earning' | 'expense';
  amount: number;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (id: string, type: 'earning' | 'expense', amount: number, description: string) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-sm mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">আজকের লেনদেন</h2>
      <div className="bg-white rounded-xl shadow-lg p-4 space-y-4 max-h-80 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">কোন লেনদেন নেই</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center p-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.02] ${
                transaction.type === 'earning' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className={`p-2 rounded-full ${transaction.type === 'earning' ? 'bg-green-200' : 'bg-red-200'}`}>
                {transaction.type === 'earning' ? (
                  <FaMoneyBill className="w-5 h-5 text-green-600" />
                ) : (
                  <FaShoppingBag className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-1 ml-4">
                <p className="text-lg font-semibold text-gray-800">{transaction.description}</p>
                <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('bn-BD')}</p>
              </div>
              <p
                className={`text-lg font-bold ${transaction.type === 'earning' ? 'text-green-600' : 'text-red-600'}`}
              >
                ৳ {transaction.amount.toFixed(2)}
              </p>
              <div className="flex space-x-2 ml-4">
                <button
                  type="button"
                  aria-label="Edit transaction"
                  onClick={() => onEdit(transaction.id, transaction.type, transaction.amount, transaction.description)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Delete transaction"
                  onClick={() => onDelete(transaction.id)}
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

export default TransactionList;