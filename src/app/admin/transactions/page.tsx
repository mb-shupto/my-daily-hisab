"use client";
import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

type Transaction = {
	id: number;
	date: string;
	user: string;
	type: 'Credit' | 'Debit';
	amount: number;
	category: string;
	status: 'Success' | 'Pending' | 'Failed';
};

const initialTransactions: Transaction[] = [
	{ id: 1, date: '2025-08-21', user: 'Shupto', type: 'Credit', amount: 5000, category: 'Bkash', status: 'Success' },
	{ id: 2, date: '2025-08-20', user: 'Rahim', type: 'Debit', amount: 1200, category: 'Food', status: 'Pending' },
	{ id: 3, date: '2025-08-19', user: 'Karim', type: 'Credit', amount: 3000, category: 'Salary', status: 'Success' },
];

export default function AdminTransactionsPage() {
	const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
	const [search, setSearch] = useState<string>('');
	const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
	const [editTx, setEditTx] = useState<Transaction | null>(null);
	const [showAdd, setShowAdd] = useState<boolean>(false);
	const [filterType, setFilterType] = useState<string>('All');

	// Filter and search
	const filteredTxs = transactions.filter(tx => {
		const matchesSearch = tx.user.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
		const matchesType = filterType === 'All' || tx.type === filterType;
		return matchesSearch && matchesType;
	});

	// Handlers
	const handleDelete = (id: number) => setTransactions(transactions.filter(tx => tx.id !== id));
	const handleView = (tx: Transaction) => setSelectedTx(tx);
	const handleEdit = (tx: Transaction) => setEditTx(tx);
	const handleAdd = (tx: Omit<Transaction, 'id'>) => {
		setTransactions([...transactions, { ...tx, id: Date.now() }]);
		setShowAdd(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4">
			<div className="mb-4">
				<a href="/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold bg-white px-3 py-2 rounded shadow transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
					Back to Dashboard
				</a>
			</div>
			<h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">Admin: Transactions</h1>
			<div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-1/2">
					<FaSearch className="w-5 h-5 text-gray-400" />
					<input
						type="text"
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
						placeholder="Search by user or category..."
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
						<label className="sr-only" htmlFor="filter-type">Filter by Type</label>
						<select
							id="filter-type"
							title="Filter by Type"
							className="px-3 py-2 border rounded-lg text-black"
							value={filterType}
							onChange={e => setFilterType(e.target.value)}
						>
							<option value="All">All</option>
							<option value="Credit">Credit</option>
							<option value="Debit">Debit</option>
						</select>
				<button
					className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
					onClick={() => setShowAdd(true)}
				>
					<FaPlus /> Add Transaction
				</button>
			</div>

			{/* Transactions Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-xl shadow-lg">
					<thead>
						<tr className="bg-indigo-100 text-gray-700">
							<th className="py-3 px-4 text-left">Date</th>
							<th className="py-3 px-4 text-left">User</th>
							<th className="py-3 px-4 text-left">Type</th>
							<th className="py-3 px-4 text-left">Amount</th>
							<th className="py-3 px-4 text-left">Category</th>
							<th className="py-3 px-4 text-left">Status</th>
							<th className="py-3 px-4 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredTxs.length === 0 ? (
							<tr>
								<td colSpan={7} className="text-center py-6 text-gray-400">No transactions found.</td>
							</tr>
						) : (
							filteredTxs.map(tx => (
								<tr key={tx.id} className="border-b hover:bg-indigo-50 text-black">
									<td className="py-2 px-4">{tx.date}</td>
									<td className="py-2 px-4">{tx.user}</td>
									<td className="py-2 px-4">{tx.type}</td>
									<td className="py-2 px-4">৳{tx.amount.toLocaleString()}</td>
									<td className="py-2 px-4">{tx.category}</td>
									<td className="py-2 px-4">
										<span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'Success' ? 'bg-green-100 text-green-700' : tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{tx.status}</span>
									</td>
									<td className="py-2 px-4 flex gap-2 justify-center">
										<button className="p-2 rounded hover:bg-indigo-200" title="View" onClick={() => handleView(tx)}><FaEye className="w-4 h-4 text-indigo-600" /></button>
										<button className="p-2 rounded hover:bg-blue-200" title="Edit" onClick={() => handleEdit(tx)}><FaEdit className="w-4 h-4 text-blue-600" /></button>
										<button className="p-2 rounded hover:bg-red-200" title="Delete" onClick={() => handleDelete(tx.id)}><FaTrash className="w-4 h-4 text-red-600" /></button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* View Transaction Modal */}
			{selectedTx && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
						<h3 className="text-xl font-bold text-indigo-700 mb-4">Transaction Details</h3>
						<p><strong>Date:</strong> {selectedTx.date}</p>
						<p><strong>User:</strong> {selectedTx.user}</p>
						<p><strong>Type:</strong> {selectedTx.type}</p>
						<p><strong>Amount:</strong> ৳{selectedTx.amount.toLocaleString()}</p>
						<p><strong>Category:</strong> {selectedTx.category}</p>
						<p><strong>Status:</strong> {selectedTx.status}</p>
						<button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700" onClick={() => setSelectedTx(null)}>Close</button>
					</div>
				</div>
			)}

			{/* Edit Transaction Modal */}
			{editTx && (
				<EditTransactionModal tx={editTx} onClose={() => setEditTx(null)} onSave={(t: Transaction) => { setTransactions(transactions.map(tx => tx.id === t.id ? t : tx)); setEditTx(null); }} />
			)}

			{/* Add Transaction Modal */}
			{showAdd && (
				<AddTransactionModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
			)}
		</div>
	);
}

// Edit Transaction Modal Component
type EditTransactionModalProps = {
	tx: Transaction;
	onClose: () => void;
	onSave: (tx: Transaction) => void;
};
function EditTransactionModal({ tx, onClose, onSave }: EditTransactionModalProps) {
	const [form, setForm] = useState<Transaction>({ ...tx });
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-black">
			<form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm" onSubmit={e => { e.preventDefault(); onSave(form); }}>
				<h3 className="text-xl font-bold text-blue-700 mb-4">Edit Transaction</h3>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Date" />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.user} onChange={e => setForm({ ...form, user: e.target.value })} placeholder="User" />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="edit-type">Type</label>
				<select id="edit-type" title="Type" className="mb-3 w-full px-3 py-2 border rounded" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Transaction['type'] })}>
					<option>Credit</option>
					<option>Debit</option>
				</select>
				<input className="mb-3 w-full px-3 py-2 border rounded" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} placeholder="Amount" />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="edit-status">Status</label>
				<select id="edit-status" title="Status" className="mb-3 w-full px-3 py-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Transaction['status'] })}>
					<option>Success</option>
					<option>Pending</option>
					<option>Failed</option>
				</select>
				<div className="flex gap-2 mt-4">
					<button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Save</button>
					<button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

// Add Transaction Modal Component
type AddTransactionModalProps = {
	onClose: () => void;
	onSave: (tx: Omit<Transaction, 'id'>) => void;
};
function AddTransactionModal({ onClose, onSave }: AddTransactionModalProps) {
	const [form, setForm] = useState<Omit<Transaction, 'id'>>({ date: '', user: '', type: 'Credit', amount: 0, category: '', status: 'Success' });
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-black" onSubmit={e => { e.preventDefault(); onSave(form); }}>
				<h3 className="text-xl font-bold text-green-700 mb-4">Add Transaction</h3>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Date" required />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.user} onChange={e => setForm({ ...form, user: e.target.value })} placeholder="User" required />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="add-type">Type</label>
				<select id="add-type" title="Type" className="mb-3 w-full px-3 py-2 border rounded" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Transaction['type'] })}>
					<option>Credit</option>
					<option>Debit</option>
				</select>
				<input className="mb-3 w-full px-3 py-2 border rounded" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} placeholder="Amount" required />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" required />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="add-status">Status</label>
				<select id="add-status" title="Status" className="mb-3 w-full px-3 py-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Transaction['status'] })}>
					<option>Success</option>
					<option>Pending</option>
					<option>Failed</option>
				</select>
				<div className="flex gap-2 mt-4">
					<button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">Add</button>
					<button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
