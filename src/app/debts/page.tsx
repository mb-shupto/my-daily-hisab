'use client';

import React, { useState, useEffect } from 'react';
import Menubar from '../components/Menubar';
import DebtList from '../components/DebtList';
import AddDebtModal from '../components/AddDebtModal';
import EditDebtModal from '../components/EditDebtModal';
import { FaPlus } from 'react-icons/fa';

interface Debt {
  id: string;
  person: string;
  amount: number;
  isOwedToUser: boolean;
  date: string;
}

export default function DebtsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isAddDebtModalOpen, setIsAddDebtModalOpen] = useState(false);
  const [isEditDebtModalOpen, setIsEditDebtModalOpen] = useState(false);
  const [editDebt, setEditDebt] = useState<Debt | null>(null);

  // Load debts from localStorage on mount
  useEffect(() => {
    const storedDebts = localStorage.getItem('debts');
    if (storedDebts) setDebts(JSON.parse(storedDebts));
  }, []);

  // Save debts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('debts', JSON.stringify(debts));
  }, [debts]);

  const handleAddDebt = (person: string, amount: number, isOwedToUser: boolean) => {
    const debt: Debt = {
      id: Math.random().toString(36).slice(2),
      person,
      amount,
      isOwedToUser,
      date: new Date().toISOString(),
    };
    setDebts((prev) => [...prev, debt]);
    setIsAddDebtModalOpen(false);
  };

  const handleEditDebt = (id: string, person: string, amount: number, isOwedToUser: boolean) => {
    setDebts((prev) =>
      prev.map((debt) =>
        debt.id === id
          ? { ...debt, person, amount, isOwedToUser, date: new Date().toISOString() }
          : debt
      )
    );
    setIsEditDebtModalOpen(false);
    setEditDebt(null);
  };

  const handleDeleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((debt) => debt.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Menubar isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl flex justify-end mb-4">
          <button
            type="button"
            title="Add Debt"
            onClick={() => setIsAddDebtModalOpen(true)}
            className="bg-blue-600 text-white rounded-full p-4 shadow-xl transform transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <FaPlus className="w-8 h-8" />
          </button>
        </div>
        <DebtList
          debts={debts}
          onEdit={(id, person, amount, isOwedToUser) => {
            setEditDebt({ id, person, amount, isOwedToUser, date: new Date().toISOString() });
            setIsEditDebtModalOpen(true);
          }}
          onDelete={handleDeleteDebt}
        />
        {isAddDebtModalOpen && (
          <AddDebtModal
            onClose={() => setIsAddDebtModalOpen(false)}
            onAdd={handleAddDebt}
          />
        )}
        {isEditDebtModalOpen && editDebt && (
          <EditDebtModal
            debt={editDebt}
            onClose={() => {
              setIsEditDebtModalOpen(false);
              setEditDebt(null);
            }}
            onEdit={handleEditDebt}
          />
        )}
      </div>
    </div>
  );
}
