'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes,  FaEdit, FaTrash } from 'react-icons/fa';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface CategoryModalProps {
  onClose: () => void;
}

export default function CategoryModal({ onClose }: CategoryModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      const defaultCategories: Category[] = [
        { id: '1', name: 'উপার্জন', type: 'income' },
        { id: '2', name: 'খরচ', type: 'expense' },
      ];
      setCategories(defaultCategories);
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }
  }, []);

  const saveCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('ক্যাটাগরির নাম প্রয়োজন।');
      return;
    }
    if (categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase() && cat.id !== editId)) {
      setError('এই নামে একটি ক্যাটাগরি ইতিমধ্যে বিদ্যমান।');
      return;
    }

    let updatedCategories: Category[];
    if (editId) {
      updatedCategories = categories.map((cat) =>
        cat.id === editId ? { ...cat, name, type } : cat
      );
    } else {
      updatedCategories = [...categories, { id: Date.now().toString(), name, type }];
    }

    saveCategories(updatedCategories);
    setName('');
    setType('income');
    setEditId(null);
    setError('');
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setType(category.type);
    setEditId(category.id);
    setError('');
  };

  const handleDelete = (id: string) => {
    if (categories.length <= 2) {
      setError('অন্তত দুটি ক্যাটাগরি থাকতে হবে।');
      return;
    }
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    saveCategories(updatedCategories);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {editId ? 'ক্যাটাগরি সম্পাদনা' : 'নতুন ক্যাটাগরি'}
          </h2>
          <button
            type="button"
            title="Close modal"
            aria-label="Close modal"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              ক্যাটাগরির নাম
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              placeholder="নাম লিখুন (যেমন: ভাড়া)"
              aria-label="Category name"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              প্রকার
            </label>
            <select
              id="type"
              name="type"
              aria-label="Category type"
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="income">উপার্জন</option>
              <option value="expense">খরচ</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full"
            aria-label={editId ? 'Update category' : 'Add category'}
          >
            {editId ? 'আপডেট করুন' : 'যোগ করুন'}
          </button>
          {error && (
            <p className="mt-2 text-sm text-red-600" aria-live="polite">
              {error}
            </p>
          )}
        </form>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">বিদ্যমান ক্যাটাগরি</h3>
          <ul className="mt-2 space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
              >
                <span>
                  {category.name} ({category.type === 'income' ? 'উপার্জন' : 'খরচ'})
                </span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    title="Edit category"
                    aria-label={`Edit ${category.name}`}
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    title="Delete category"
                    aria-label={`Delete ${category.name}`}
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
