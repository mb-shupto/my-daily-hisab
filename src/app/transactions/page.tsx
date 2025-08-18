'use client';

import React, { useState, useEffect } from 'react';
import Menubar from '../components/Menubar';
import TransactionList from '../components/TransactionList';
import EditTransactionModal from '../components/EditTransactionModal';

interface Transaction {
  id: string;
  type: 'earning' | 'expense';
  amount: number;
  description: string;
  date: string;
}

export default function TransactionsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleEditTransaction = (
    id: string,
    type: 'earning' | 'expense',
    amount: number,
    description: string
  ) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? { ...transaction, type, amount, description, date: new Date().toISOString() }
          : transaction
      )
    );
    setIsEditTransactionModalOpen(false);
    setEditTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Menubar isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <TransactionList
          transactions={transactions}
          onEdit={(id, type, amount, description) => {
            setEditTransaction({ id, type, amount, description, date: new Date().toISOString() });
            setIsEditTransactionModalOpen(true);
          }}
          onDelete={handleDeleteTransaction}
        />
        {isEditTransactionModalOpen && editTransaction && (
          <EditTransactionModal
            transaction={editTransaction}
            onClose={() => {
              setIsEditTransactionModalOpen(false);
              setEditTransaction(null);
            }}
            onEdit={handleEditTransaction}
          />
        )}
      </div>
    </div>
  );
}
