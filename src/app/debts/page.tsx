'use client';

import React, { useState, useEffect } from 'react';
import Menubar from '../components/Menubar';
import DebtList from '../components/DebtList';

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

  // Load debts from localStorage on mount
  useEffect(() => {
    const storedDebts = localStorage.getItem('debts');
    if (storedDebts) setDebts(JSON.parse(storedDebts));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Menubar isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <DebtList debts={debts} />
      </div>
    </div>
  );
}