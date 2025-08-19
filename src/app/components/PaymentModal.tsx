'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onPaymentComplete: (gateway: string) => void;
}

export default function PaymentModal({ amount, onClose, onPaymentComplete }: PaymentModalProps) {
  const [gateway, setGateway] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateway) return alert('গেটওয়ে নির্বাচন করুন।');

    // Simulate payment initiation
    // In real implementation, call the API based on gateway
    try {
      const response = await fetch('/api/bkash/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, debtId: 'simulated' }),
      });
      const data = await response.json();
      if (data.paymentURL) {
        window.location.href = data.paymentURL;
        onPaymentComplete(gateway);
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">পেমেন্ট গেটওয়ে নির্বাচন করুন</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">পরিমাণ</label>
            <p className="mt-1 text-black">৳ {amount.toFixed(2)}</p>
          </div>
          <div>
            <label htmlFor="gateway" className="block text-sm font-medium text-gray-700">
              গেটওয়ে
            </label>
            <select
              id="gateway"
              name="gateway"
              aria-label="Payment gateway"
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-black"
            >
              <option value="" disabled>
                গেটওয়ে নির্বাচন করুন
              </option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="bank">Bank Payment</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              aria-label="Pay"
            >
              পেমেন্ট করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
