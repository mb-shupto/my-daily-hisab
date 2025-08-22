'use client';

import React, { useState, useEffect } from 'react';
import Menubar from '../components/Menubar';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import EditTransactionModal from '../components/EditTransactionModal';
import { FaPlus } from 'react-icons/fa';

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
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
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

  const handleAddTransaction = (
    type: 'earning' | 'expense',
    amount: number,
    description: string
  ) => {
    const transaction: Transaction = {
      id: Math.random().toString(36).slice(2),
      type,
      amount,
      description,
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [...prev, transaction]);
    setIsAddTransactionModalOpen(false);
  };

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
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      {/* Menubar fixed to top right */}
      <div className="fixed top-4 right-60 z-50">
        <Menubar isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Back button to dashboard */}
        <div className="w-full max-w-4xl flex justify-between items-center mb-4">
          <button
            type="button"
            title="Back to Dashboard"
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 shadow hover:bg-gray-300 transition-all duration-200"
          >
            ← ড্যাশবোর্ড
          </button>
          <button
            type="button"
            title="Add Transaction"
            onClick={() => setIsAddTransactionModalOpen(true)}
            className="bg-blue-600 text-white rounded-full p-4 shadow-xl transform transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <FaPlus className="w-8 h-8" />
          </button>
        </div>
        <TransactionList
          transactions={transactions}
          onEdit={(id, type, amount, description) => {
            setEditTransaction({ id, type, amount, description, date: new Date().toISOString() });
            setIsEditTransactionModalOpen(true);
          }}
          onDelete={handleDeleteTransaction}
        />
        {isAddTransactionModalOpen && (
          <AddTransactionModal
            onClose={() => setIsAddTransactionModalOpen(false)}
            onAdd={handleAddTransaction}
          />
        )}
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
