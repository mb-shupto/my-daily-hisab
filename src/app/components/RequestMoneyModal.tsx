import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RequestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequest: (name: string, amount: number, date: string) => void;
  name: string;
  amount: number;
}

const RequestMoneyModal: React.FC<RequestMoneyModalProps> = ({
  isOpen,
  onClose,
  onRequest,
  name,
  amount,
}) => {
  const [date, setDate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          টাকা অনুরোধ করুন
        </h2>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            নাম
          </label>
          <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-sm text-black">
            {name}
          </div>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-semibold text-black">
            পরিমাণ
          </label>
          <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-sm text-black">
            ৳ {amount}
          </div>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            শেষ তারিখ
          </label>
          <input
            aria-label="শেষ তারিখ"
            type="date"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm text-black"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-semibold hover:bg-gray-300 transition"
            onClick={onClose}
          >
            বাতিল
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => {
              const today = new Date();
              const selectedDate = date ? new Date(date) : null;
              // Remove time part for comparison
              today.setHours(0,0,0,0);
              if (!selectedDate || selectedDate < today) {
                toast('অনুরোধের শেষ তারিখ বৈধ হতে হবে!', { type: 'error' });
                return;
              }
              onRequest(name, amount, date);
              toast('অনুরোধ সফলভাবে পাঠানো হয়েছে!');
              setDate("");
              onClose();
            }}
            disabled={!date}
          >
            অনুরোধ নিশ্চিত করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestMoneyModal;
