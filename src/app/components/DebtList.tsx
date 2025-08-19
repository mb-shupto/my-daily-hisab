'use client';

import React from 'react';
import { FaEdit, FaTrash, FaCreditCard } from 'react-icons/fa';

interface Debt {
  id: string;
  person: string;
  amount: number;
  isOwedToUser: boolean;
  date: string;
  paid?: boolean;
}

interface DebtListProps {
  debts: Debt[];
  onEdit: (id: string, person: string, amount: number, isOwedToUser: boolean) => void;
  onDelete: (id: string) => void;
  onPay: (debtId: string, amount: number) => void;
}

export default function DebtList({ debts, onEdit, onDelete, onPay }: DebtListProps) {
  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">পাওনা/দেনার তালিকা</h2>
      {debts.length === 0 ? (
        <p className="text-gray-600">কোনো পাওনা/দেনা পাওয়া যায়নি।</p>
      ) : (
        <ul className="space-y-2">
          {debts.map((debt) => (
            <li
              key={debt.id}
              className="flex justify-between items-center p-2 border-b border-gray-200"
            >
              <div>
                <p className="text-gray-800 font-medium">
                  {debt.person}{' '}
                  <span
                    className={`${debt.isOwedToUser ? 'text-green-500' : 'text-red-500'}`}
                  >
                    ({debt.isOwedToUser ? 'পাওনা' : 'দেনা'})
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  ৳ {debt.amount.toFixed(2)} |{' '}
                  {new Date(debt.date).toLocaleDateString('bn-BD')}
                  {debt.paid && ' | Paid'}
                </p>
              </div>
              <div className="flex space-x-2">
                {!debt.paid && !debt.isOwedToUser && (
                  <button
                    onClick={() => onPay(debt.id, debt.amount)}
                    className="text-green-600 hover:text-green-800"
                    aria-label={`Pay debt with ${debt.person}`}
                  >
                    <FaCreditCard className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() =>
                    onEdit(debt.id, debt.person, debt.amount, debt.isOwedToUser)
                  }
                  className="text-blue-600 hover:text-blue-800"
                  aria-label={`Edit debt with ${debt.person}`}
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(debt.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Delete debt with ${debt.person}`}
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
