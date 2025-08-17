'use client';

import React, { useState, useEffect } from 'react';
import Menubar from '../components/Menubar';
import DebtList from '../components/DebtList';
import EditDebtModal from '../components/EditDebtModal';

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

  const handleEditDebt = (
    id: string,
    person: string,
    amount: number,
    isOwedToUser: boolean
  ) => {
    const debtIndex = debts.findIndex((debt) => debt.id === id);
    if (debtIndex !== -1) {
      const updatedDebts = [...debts];
      updatedDebts[debtIndex] = {
        id,
        person,
        amount,
        isOwedToUser,
        date: new Date().toISOString(),
      };
      setDebts(updatedDebts);
      setIsEditDebtModalOpen(false);
      setEditDebt(null);
    }
  };

  const handleDeleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((debt) => debt.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Menubar
        isOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <DebtList
          debts={debts}
          onEdit={(id, person, amount, isOwedToUser) => {
            setEditDebt({ id, person, amount, isOwedToUser, date: new Date().toISOString() });
            setIsEditDebtModalOpen(true);
          }}
          onDelete={handleDeleteDebt}
        />
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
