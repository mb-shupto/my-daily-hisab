"use client";
import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

type Debt = {
	id: number;
	date: string;
	user: string;
	type: 'Debt' | 'Request';
	amount: number;
	status: 'Pending' | 'Paid' | 'Rejected';
	note?: string;
};

const initialDebts: Debt[] = [
	{ id: 1, date: '2025-08-21', user: 'Shupto', type: 'Debt', amount: 2000, status: 'Pending', note: 'Lunch' },
	{ id: 2, date: '2025-08-20', user: 'Rahim', type: 'Request', amount: 500, status: 'Paid', note: 'Bkash payment' },
	{ id: 3, date: '2025-08-19', user: 'Karim', type: 'Debt', amount: 1500, status: 'Rejected', note: 'Borrowed for books' },
];

export default function AdminDebtsPage() {
	const [debts, setDebts] = useState<Debt[]>(initialDebts);
	const [search, setSearch] = useState<string>('');
	const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
	const [editDebt, setEditDebt] = useState<Debt | null>(null);
	const [showAdd, setShowAdd] = useState<boolean>(false);
	const [filterType, setFilterType] = useState<string>('All');

	// Filter and search
	const filteredDebts = debts.filter(debt => {
		const matchesSearch = debt.user.toLowerCase().includes(search.toLowerCase()) || (debt.note?.toLowerCase().includes(search.toLowerCase()) ?? false);
		const matchesType = filterType === 'All' || debt.type === filterType;
		return matchesSearch && matchesType;
	});

	// Handlers
	const handleDelete = (id: number) => setDebts(debts.filter(debt => debt.id !== id));
	const handleView = (debt: Debt) => setSelectedDebt(debt);
	const handleEdit = (debt: Debt) => setEditDebt(debt);
	const handleAdd = (debt: Omit<Debt, 'id'>) => {
		setDebts([...debts, { ...debt, id: Date.now() }]);
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
			<h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">Admin: Debts & Requests</h1>
			<div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-1/2">
					<FaSearch className="w-5 h-5 text-gray-400" />
					<input
						type="text"
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
						placeholder="Search by user or note..."
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
					<option value="Debt">Debt</option>
					<option value="Request">Request</option>
				</select>
				<button
					className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
					onClick={() => setShowAdd(true)}
				>
					<FaPlus /> Add Debt/Request
				</button>
			</div>

			{/* Debts Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-xl shadow-lg">
					<thead>
						<tr className="bg-indigo-100 text-gray-700">
							<th className="py-3 px-4 text-left">Date</th>
							<th className="py-3 px-4 text-left">User</th>
							<th className="py-3 px-4 text-left">Type</th>
							<th className="py-3 px-4 text-left">Amount</th>
							<th className="py-3 px-4 text-left">Status</th>
							<th className="py-3 px-4 text-left">Note</th>
							<th className="py-3 px-4 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredDebts.length === 0 ? (
							<tr>
								<td colSpan={7} className="text-center py-6 text-gray-400">No debts or requests found.</td>
							</tr>
						) : (
							filteredDebts.map(debt => (
								<tr key={debt.id} className="border-b hover:bg-indigo-50 text-black">
									<td className="py-2 px-4">{debt.date}</td>
									<td className="py-2 px-4">{debt.user}</td>
									<td className="py-2 px-4">{debt.type}</td>
									<td className="py-2 px-4">৳{debt.amount.toLocaleString()}</td>
									<td className="py-2 px-4">
										<span className={`px-2 py-1 rounded text-xs font-bold ${debt.status === 'Paid' ? 'bg-green-100 text-green-700' : debt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{debt.status}</span>
									</td>
									<td className="py-2 px-4">{debt.note}</td>
									<td className="py-2 px-4 flex gap-2 justify-center">
										<button className="p-2 rounded hover:bg-indigo-200" title="View" onClick={() => handleView(debt)}><FaEye className="w-4 h-4 text-indigo-600" /></button>
										<button className="p-2 rounded hover:bg-blue-200" title="Edit" onClick={() => handleEdit(debt)}><FaEdit className="w-4 h-4 text-blue-600" /></button>
										<button className="p-2 rounded hover:bg-red-200" title="Delete" onClick={() => handleDelete(debt.id)}><FaTrash className="w-4 h-4 text-red-600" /></button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* View Debt Modal */}
			{selectedDebt && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
						<h3 className="text-xl font-bold text-indigo-700 mb-4">Debt/Request Details</h3>
						<p><strong>Date:</strong> {selectedDebt.date}</p>
						<p><strong>User:</strong> {selectedDebt.user}</p>
						<p><strong>Type:</strong> {selectedDebt.type}</p>
						<p><strong>Amount:</strong> ৳{selectedDebt.amount.toLocaleString()}</p>
						<p><strong>Status:</strong> {selectedDebt.status}</p>
						<p><strong>Note:</strong> {selectedDebt.note}</p>
						<button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700" onClick={() => setSelectedDebt(null)}>Close</button>
					</div>
				</div>
			)}

			{/* Edit Debt Modal */}
			{editDebt && (
				<EditDebtModal debt={editDebt} onClose={() => setEditDebt(null)} onSave={(d: Debt) => { setDebts(debts.map(debt => debt.id === d.id ? d : debt)); setEditDebt(null); }} />
			)}

			{/* Add Debt Modal */}
			{showAdd && (
				<AddDebtModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
			)}
		</div>
	);
}

// Edit Debt Modal Component
type EditDebtModalProps = {
	debt: Debt;
	onClose: () => void;
	onSave: (debt: Debt) => void;
};
function EditDebtModal({ debt, onClose, onSave }: EditDebtModalProps) {
	const [form, setForm] = useState<Debt>({ ...debt });
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-black">
			<form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm" onSubmit={e => { e.preventDefault(); onSave(form); }}>
				<h3 className="text-xl font-bold text-blue-700 mb-4">Edit Debt/Request</h3>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Date" />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.user} onChange={e => setForm({ ...form, user: e.target.value })} placeholder="User" />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="edit-type">Type</label>
				<select id="edit-type" title="Type" className="mb-3 w-full px-3 py-2 border rounded" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Debt['type'] })}>
					<option>Debt</option>
					<option>Request</option>
				</select>
				<input className="mb-3 w-full px-3 py-2 border rounded" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} placeholder="Amount" />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="edit-status">Status</label>
				<select id="edit-status" title="Status" className="mb-3 w-full px-3 py-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Debt['status'] })}>
					<option>Pending</option>
					<option>Paid</option>
					<option>Rejected</option>
				</select>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.note ?? ''} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="Note" />
				<div className="flex gap-2 mt-4">
					<button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Save</button>
					<button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

// Add Debt Modal Component
type AddDebtModalProps = {
	onClose: () => void;
	onSave: (debt: Omit<Debt, 'id'>) => void;
};
function AddDebtModal({ onClose, onSave }: AddDebtModalProps) {
	const [form, setForm] = useState<Omit<Debt, 'id'>>({ date: '', user: '', type: 'Debt', amount: 0, status: 'Pending', note: '' });
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-black" onSubmit={e => { e.preventDefault(); onSave(form); }}>
				<h3 className="text-xl font-bold text-green-700 mb-4">Add Debt/Request</h3>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Date" required />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.user} onChange={e => setForm({ ...form, user: e.target.value })} placeholder="User" required />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="add-type">Type</label>
				<select id="add-type" title="Type" className="mb-3 w-full px-3 py-2 border rounded" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Debt['type'] })}>
					<option>Debt</option>
					<option>Request</option>
				</select>
				<input className="mb-3 w-full px-3 py-2 border rounded" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} placeholder="Amount" required />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="add-status">Status</label>
				<select id="add-status" title="Status" className="mb-3 w-full px-3 py-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Debt['status'] })}>
					<option>Pending</option>
					<option>Paid</option>
					<option>Rejected</option>
				</select>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.note ?? ''} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="Note" />
				<div className="flex gap-2 mt-4">
					<button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">Add</button>
					<button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
