"use client";
import React, { useState } from 'react';
import { FaChartBar, FaSearch } from 'react-icons/fa';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement,
	LineElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

// Dummy analytics data
const stats = {
	totalUsers: 120,
	totalTransactions: 340,
	totalDebts: 45,
	totalRequests: 20,
	totalAmount: 120000,
};

const transactionData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
	datasets: [
		{
			label: 'Transactions',
			data: [30, 45, 60, 50, 80, 90, 70, 100],
			backgroundColor: 'rgba(99,102,241,0.7)',
		},
	],
};

const debtPieData = {
	labels: ['Paid', 'Pending', 'Rejected'],
	datasets: [
		{
			label: 'Debts',
			data: [25, 15, 5],
			backgroundColor: [
				'rgba(34,197,94,0.7)',
				'rgba(253,224,71,0.7)',
				'rgba(239,68,68,0.7)',
			],
		},
	],
};

const userLineData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
	datasets: [
		{
			label: 'New Users',
			data: [10, 15, 20, 18, 25, 30, 28, 35],
			borderColor: 'rgba(16,185,129,1)',
			backgroundColor: 'rgba(16,185,129,0.2)',
			fill: true,
			tension: 0.4,
		},
	],
};

export default function AdminAnalyticsPage() {
	const [search, setSearch] = useState('');
	// Filter logic can be added for real data

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4">
			<div className="mb-4">
				<a href="/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold bg-white px-3 py-2 rounded shadow transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
					Back to Dashboard
				</a>
			</div>
			<h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2"><FaChartBar /> Admin: Analytics</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
				<div className="bg-white rounded-xl shadow p-4 text-center">
					<div className="text-lg font-bold text-indigo-600">Users</div>
					<div className="text-2xl font-extrabold text-gray-500">{stats.totalUsers}</div>
				</div>
				<div className="bg-white rounded-xl shadow p-4 text-center">
					<div className="text-lg font-bold text-indigo-600">Transactions</div>
					<div className="text-2xl font-extrabold text-gray-500">{stats.totalTransactions}</div>
				</div>
				<div className="bg-white rounded-xl shadow p-4 text-center">
					<div className="text-lg font-bold text-indigo-600">Debts</div>
					<div className="text-2xl font-extrabold text-gray-500">{stats.totalDebts}</div>
				</div>
				<div className="bg-white rounded-xl shadow p-4 text-center">
					<div className="text-lg font-bold text-indigo-600">Requests</div>
					<div className="text-2xl font-extrabold text-gray-500">{stats.totalRequests}</div>
				</div>
				<div className="bg-white rounded-xl shadow p-4 text-center">
					<div className="text-lg font-bold text-indigo-600">Total Amount</div>
					<div className="text-2xl font-extrabold text-gray-500">৳{stats.totalAmount.toLocaleString()}</div>
				</div>
			</div>

			{/* Search/Filter Bar */}
			<div className="flex items-center gap-2 mb-8">
				<FaSearch className="w-5 h-5 text-gray-400" />
				<input
					type="text"
					className="w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
					placeholder="Search analytics..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="bg-white rounded-xl shadow p-4">
					<h2 className="text-lg font-bold text-indigo-700 mb-2">Transactions (Monthly)</h2>
					<Bar data={transactionData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
				</div>
				<div className="bg-white rounded-xl shadow p-4">
					<h2 className="text-lg font-bold text-indigo-700 mb-2">Debts Status</h2>
					<Pie data={debtPieData} options={{ responsive: true }} />
				</div>
				<div className="bg-white rounded-xl shadow p-4">
					<h2 className="text-lg font-bold text-indigo-700 mb-2">New Users (Monthly)</h2>
					<Line data={userLineData} options={{ responsive: true }} />
				</div>
			</div>
		</div>
	);
}
