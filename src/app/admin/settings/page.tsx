"use client";
import React, { useState } from 'react';
import { FaUserCog, FaBell, FaMoon, FaSun, FaLock, FaArrowLeft } from 'react-icons/fa';

export default function AdminSettingsPage() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [notifications, setNotifications] = useState<boolean>(true);
	const [profile, setProfile] = useState({ name: 'Admin', email: 'admin@example.com' });
	const [showPasswordModal, setShowPasswordModal] = useState(false);

	// Handlers
	const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
	const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};
		const handlePasswordChange = () => {
			// Implement password change logic
			setShowPasswordModal(false);
		};

	return (
		<div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
			<div className="mb-4">
				<a href="/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold bg-white px-3 py-2 rounded shadow transition-colors">
					<FaArrowLeft /> Back to Dashboard
				</a>
			</div>
			<h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2"><FaUserCog /> Admin: Control Panel</h1>

			{/* Profile Section */}
			<div className="bg-white rounded-xl shadow p-6 mb-8 max-w-lg mx-auto">
				<h2 className="text-lg font-bold text-indigo-700 mb-4">Profile Settings</h2>
				<div className="mb-3">
					<label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
					  <input name="name" className="w-full px-3 py-2 border rounded text-black" value={profile.name} onChange={handleProfileChange} placeholder="Name" title="Name" />
				</div>
				<div className="mb-3">
					<label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
					  <input name="email" className="w-full px-3 py-2 border rounded text-black" value={profile.email} onChange={handleProfileChange} placeholder="Email" title="Email" />
				</div>
				<button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Save Changes</button>
			</div>

			{/* Password Section */}
			<div className="bg-white rounded-xl shadow p-6 mb-8 max-w-lg mx-auto">
				<h2 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2"><FaLock /> Change Password</h2>
				<button className="bg-indigo-500 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-600" onClick={() => setShowPasswordModal(true)}>Change Password</button>
			</div>

			{/* Notification Section */}
			<div className="bg-white rounded-xl shadow p-6 mb-8 max-w-lg mx-auto flex items-center justify-between">
				<div className="flex items-center gap-2">
					<FaBell className="text-yellow-500" />
					<span className="font-semibold">Notifications</span>
				</div>
						<label className="flex items-center cursor-pointer" htmlFor="admin-notifications">
							<input id="admin-notifications" type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only" title="Enable notifications" />
							<span className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 ${notifications ? 'bg-green-400' : 'bg-gray-300'}`}>
								<span className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${notifications ? 'translate-x-4' : ''}`}></span>
							</span>
						</label>
			</div>

			{/* Theme Section */}
			<div className="bg-white rounded-xl shadow p-6 mb-8 max-w-lg mx-auto flex items-center justify-between">
				<div className="flex items-center gap-2">
					{theme === 'light' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-700" />}
					<span className="font-semibold">Theme</span>
				</div>
				<button className="bg-indigo-500 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-600 flex items-center gap-2" onClick={handleThemeToggle}>
					{theme === 'light' ? <FaMoon /> : <FaSun />} Switch to {theme === 'light' ? 'Dark' : 'Light'}
				</button>
			</div>

			{/* Password Modal */}
			{showPasswordModal && (
				<PasswordModal onClose={() => setShowPasswordModal(false)} onSave={handlePasswordChange} />
			)}
		</div>
	);
}

// Password Modal Component
type PasswordModalProps = {
	onClose: () => void;
	onSave: (newPass: string) => void;
};
function PasswordModal({ onClose, onSave }: PasswordModalProps) {
	const [pass, setPass] = useState('');
	const [confirm, setConfirm] = useState('');
	const [error, setError] = useState('');
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (pass.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}
		if (pass !== confirm) {
			setError('Passwords do not match');
			return;
		}
		onSave(pass);
	};
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-black" onSubmit={handleSubmit}>
				<h3 className="text-xl font-bold text-indigo-700 mb-4">Change Password</h3>
				<input type="password" className="mb-3 w-full px-3 py-2 border rounded" value={pass} onChange={e => setPass(e.target.value)} placeholder="New Password" required />
				<input type="password" className="mb-3 w-full px-3 py-2 border rounded" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm Password" required />
				{error && <div className="text-red-600 mb-2">{error}</div>}
				<div className="flex gap-2 mt-4">
					<button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">Save</button>
					<button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
				</div>
			</form>
		</div>
	);
}
