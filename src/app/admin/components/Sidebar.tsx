"use client";
import React, { useState } from 'react';
import { FaBars, FaUsers, FaMoneyCheckAlt, FaListAlt, FaChartBar, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminSidebar() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Hamburger Button */}
			<button
				className="fixed top-4 left-4 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg md:hidden"
				onClick={() => setOpen(!open)}
				aria-label="Toggle sidebar"
			>
				<FaBars className="w-6 h-6" />
			</button>

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
				aria-label="Admin Sidebar"
			>
				<div className="h-full px-4 py-6 flex flex-col gap-6">
					<h2 className="text-2xl font-bold text-indigo-700 mb-4">Admin Panel</h2>
					<nav className="flex-1 flex flex-col gap-4">
						<Link href="/admin" className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
							<FaChartBar className="w-5 h-5 text-indigo-500" />
							<span>Dashboard</span>
						</Link>
						<Link href="/admin/users" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
							<FaUsers className="w-5 h-5 text-blue-500" />
							<span>Users</span>
						</Link>
						<Link href="/admin/transactions" className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
							<FaMoneyCheckAlt className="w-5 h-5 text-green-500" />
							<span>Transactions</span>
						</Link>
						<Link href="/admin/debts" className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
							<FaListAlt className="w-5 h-5 text-purple-500" />
							<span>Debts & Requests</span>
						</Link>
						<Link href="/admin/analytics" className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 transition-colors">
							<FaChartBar className="w-5 h-5 text-indigo-400" />
							<span>Analytics</span>
						</Link>
						<Link href="/admin/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 transition-colors">
							<FaUserShield className="w-5 h-5 text-red-500" />
							<span>Admin Controls</span>
						</Link>
					</nav>
					<Link href="/admin/login" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors mt-auto">
						<FaSignOutAlt className="w-5 h-5 text-gray-500" />
						<span>Logout</span>
					</Link>
				</div>
			</aside>
		</>
	);
}
