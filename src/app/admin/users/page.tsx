"use client";
import React, { useState } from 'react';
import { FaSearch, FaUserEdit, FaTrash, FaEye, FaUserPlus } from 'react-icons/fa';


type User = {
	id: number;
	name: string;
	email: string;
	role: 'User' | 'Admin';
	status: 'Active' | 'Inactive';
};

const initialUsers: User[] = [
	{ id: 1, name: 'Shupto', email: 'shupto@example.com', role: 'User', status: 'Active' },
	{ id: 2, name: 'Rahim', email: 'rahim@example.com', role: 'Admin', status: 'Active' },
	{ id: 3, name: 'Karim', email: 'karim@example.com', role: 'User', status: 'Inactive' },
];


export default function AdminUsersPage() {
	const [users, setUsers] = useState<User[]>(initialUsers);
	const [search, setSearch] = useState<string>('');
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [editUser, setEditUser] = useState<User | null>(null);
	const [showAdd, setShowAdd] = useState<boolean>(false);

	// Filter users by search
	const filteredUsers = users.filter((u: User) =>
		u.name.toLowerCase().includes(search.toLowerCase()) ||
		u.email.toLowerCase().includes(search.toLowerCase())
	);

	// Handlers for actions
	const handleDelete = (id: number) => {
		setUsers(users.filter((u: User) => u.id !== id));
	};
	const handleView = (user: User) => setSelectedUser(user);
	const handleEdit = (user: User) => setEditUser(user);
	const handleAdd = (user: Omit<User, 'id'>) => {
		setUsers([...users, { ...user, id: Date.now() }]);
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
				<h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">Admin: Users</h1>
			<div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-1/2">
					<FaSearch className="w-5 h-5 " />
					<input
						type="text"
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
						placeholder="Search by name or email..."
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
				<button
					className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
					onClick={() => setShowAdd(true)}
				>
					<FaUserPlus /> Add User
				</button>
			</div>

			{/* Users Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-xl shadow-lg">
					<thead>
						<tr className="bg-indigo-100 text-gray-700">
							<th className="py-3 px-4 text-left">Name</th>
							<th className="py-3 px-4 text-left">Email</th>
							<th className="py-3 px-4 text-left">Role</th>
							<th className="py-3 px-4 text-left">Status</th>
							<th className="py-3 px-4 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.length === 0 ? (
							<tr>
								<td colSpan={5} className="text-center py-6 text-gray-400">No users found.</td>
							</tr>
						) : (
							filteredUsers.map((user: User) => (
								<tr key={user.id} className="border-b hover:bg-indigo-50 text-black">
									<td className="py-2 px-4">{user.name}</td>
									<td className="py-2 px-4">{user.email}</td>
									<td className="py-2 px-4">{user.role}</td>
									<td className="py-2 px-4">
										<span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span>
									</td>
									<td className="py-2 px-4 flex gap-2 justify-center">
										<button className="p-2 rounded hover:bg-indigo-200" title="View" onClick={() => handleView(user)}><FaEye className="w-4 h-4 text-indigo-600" /></button>
										<button className="p-2 rounded hover:bg-blue-200" title="Edit" onClick={() => handleEdit(user)}><FaUserEdit className="w-4 h-4 text-blue-600" /></button>
										<button className="p-2 rounded hover:bg-red-200" title="Delete" onClick={() => handleDelete(user.id)}><FaTrash className="w-4 h-4 text-red-600" /></button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* View User Modal */}
			{selectedUser && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
						<h3 className="text-xl font-bold text-indigo-700 mb-4">User Details</h3>
						<p><strong>Name:</strong> {selectedUser.name}</p>
						<p><strong>Email:</strong> {selectedUser.email}</p>
						<p><strong>Role:</strong> {selectedUser.role}</p>
						<p><strong>Status:</strong> {selectedUser.status}</p>
						<button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700" onClick={() => setSelectedUser(null)}>Close</button>
					</div>
				</div>
			)}

			{/* Edit User Modal */}
			{editUser && (
				<EditUserModal user={editUser} onClose={() => setEditUser(null)} onSave={(u: User) => { setUsers(users.map((user: User) => user.id === u.id ? u : user)); setEditUser(null); }} />
			)}

			{/* Add User Modal */}
			{showAdd && (
				<AddUserModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
			)}
		</div>
	);
}


// Edit User Modal Component
type EditUserModalProps = {
	user: User;
	onClose: () => void;
	onSave: (user: User) => void;
};
function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
	const [form, setForm] = useState<User>({ ...user });
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-black">
			<form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm" onSubmit={e => { e.preventDefault(); onSave(form); }}>
				<h3 className="text-xl font-bold text-blue-700 mb-4">Edit User</h3>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="edit-role">Role</label>
				<select id="edit-role" title="Role" className="mb-3 w-full px-3 py-2 border rounded" value={form.role} onChange={e => setForm({ ...form, role: e.target.value as User['role'] })}>
					<option>User</option>
					<option>Admin</option>
				</select>
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="edit-status">Status</label>
				<select id="edit-status" title="Status" className="mb-3 w-full px-3 py-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as User['status'] })}>
					<option>Active</option>
					<option>Inactive</option>
				</select>
				<div className="flex gap-2 mt-4">
					<button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Save</button>
					<button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
				</div>
			</form>
		</div>
	);
}


// Add User Modal Component
type AddUserModalProps = {
	onClose: () => void;
	onSave: (user: Omit<User, 'id'>) => void;
};
function AddUserModal({ onClose, onSave }: AddUserModalProps) {
	const [form, setForm] = useState<Omit<User, 'id'>>({ name: '', email: '', role: 'User', status: 'Active' });
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-black" onSubmit={e => { e.preventDefault(); onSave(form); }}>
				<h3 className="text-xl font-bold text-green-700 mb-4">Add User</h3>
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
				<input className="mb-3 w-full px-3 py-2 border rounded" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="add-role">Role</label>
				<select id="add-role" title="Role" className="mb-3 w-full px-3 py-2 border rounded" value={form.role} onChange={e => setForm({ ...form, role: e.target.value as User['role'] })}>
					<option>User</option>
					<option>Admin</option>
				</select>
				<label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="add-status">Status</label>
				<select id="add-status" title="Status" className="mb-3 w-full px-3 py-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as User['status'] })}>
					<option>Active</option>
					<option>Inactive</option>
				</select>
				<div className="flex gap-2 mt-4">
					<button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">Add</button>
					<button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
