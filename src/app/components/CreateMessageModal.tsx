import React, { useState } from "react";

interface CreateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (recipient: string, message: string) => void;
}

const CreateMessageModal: React.FC<CreateMessageModalProps> = ({ isOpen, onClose, onSend }) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">নতুন মেসেজ</h2>
        <div className="mb-3">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm text-black"
            placeholder="প্রাপক/স্টোরের নাম"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm text-black"
            placeholder="আপনার মেসেজ লিখুন"
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
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
              onSend(recipient, message);
              setRecipient("");
              setMessage("");
              onClose();
            }}
            disabled={!recipient || !message}
          >
            পাঠান
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMessageModal;
