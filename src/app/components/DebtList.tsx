'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaCreditCard, FaHandHoldingUsd } from 'react-icons/fa';
import RequestMoneyModal from './RequestMoneyModal';
import DeleteDebtModal from './DeleteDebtModal';
import { Bounce } from 'react-toastify';

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDebtId, setSelectedDebtId] = useState<string | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestDebt, setRequestDebt] = useState<Debt | null>(null);
  const handleRequestClick = (debt: Debt) => {
    setRequestDebt(debt);
    setRequestModalOpen(true);
  };

  const handleRequestMoney = (name: string, amount: number, date: string) => {
    // You can add your request logic here (e.g., send to API)
    setRequestModalOpen(false);
    setRequestDebt(null);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedDebtId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDebtId) {
      onDelete(selectedDebtId);
      setDeleteModalOpen(false);
      setSelectedDebtId(null);
    }
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setSelectedDebtId(null);
  };

  return (
    <>
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
                  {/* Show Pay button for debts user owes */}
                  {!debt.paid && !debt.isOwedToUser && (
                    <button
                      onClick={() => onPay(debt.id, debt.amount)}
                      className="text-green-600 hover:text-green-800"
                      aria-label={`Pay debt with ${debt.person}`}
                    >
                      <FaCreditCard className="w-5 h-5" />
                    </button>
                  )}
                  {/* Show Request Money button for debts owed to user */}
                  {!debt.paid && debt.isOwedToUser && (
                    <button
                      onClick={() => handleRequestClick(debt)}
                      className="text-violet-600 hover:text-violet-800"
                      aria-label={`Request money from ${debt.person}`}
                    >
                      <FaHandHoldingUsd className="w-5 h-5" />
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
                    onClick={() => handleDeleteClick(debt.id)}
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
        <DeleteDebtModal
          isOpen={deleteModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
        {/* Request Money Modal */}
        <RequestMoneyModal
          isOpen={requestModalOpen}
          onClose={() => { setRequestModalOpen(false); setRequestDebt(null); }}
          onRequest={handleRequestMoney}
          name={requestDebt?.person || ""}
          amount={requestDebt?.amount || 0}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="!bg-green-500 !text-white"
      />
    </>
  );
}
