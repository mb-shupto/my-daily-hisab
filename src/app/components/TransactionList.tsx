'use client';

import React from 'react';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface Transaction {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
}

export default function TransactionList({ transactions, categories }: TransactionListProps) {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? `${category.name} (${category.type === 'income' ? 'উপার্জন' : 'খরচ'})` : 'N/A';
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-gray-800">লেনদেনের তালিকা</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-600">কোনো লেনদেন নেই।</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="p-2 bg-gray-100 rounded-lg">
              <div className="flex justify-between">
                <span>{getCategoryName(transaction.categoryId)}</span>
                <span>৳{transaction.amount.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-600">{transaction.description}</div>
              <div className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString('bn-BD')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}