'use client';

import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteTransactionModal from './DeleteTransactionModal';

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

export default function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedTransactionId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTransactionId) {
      onDelete(selectedTransactionId);
      setDeleteModalOpen(false);
      setSelectedTransactionId(null);
    }
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setSelectedTransactionId(null);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">লেনদেনের তালিকা</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-600">কোনো লেনদেন পাওয়া যায়নি।</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center p-2 border-b border-gray-200"
            >
              <div>
                <p className="text-gray-800 font-medium">
                  {transaction.description}{' '}
                  <span
                    className={`${
                      transaction.type === 'earning' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    ({transaction.type === 'earning' ? 'উপার্জন' : 'খরচ'})
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  ৳ {transaction.amount.toFixed(2)} |{' '}
                  {new Date(transaction.date).toLocaleDateString('bn-BD')}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    onEdit(
                      transaction.id,
                      transaction.type,
                      transaction.amount,
                      transaction.description
                    )
                  }
                  className="text-blue-600 hover:text-blue-800"
                  aria-label={`Edit transaction ${transaction.description}`}
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(transaction.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Delete transaction ${transaction.description}`}
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <DeleteTransactionModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
