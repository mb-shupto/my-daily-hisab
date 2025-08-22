"use client";
import React, { useState } from 'react';
import { toBengaliDigits } from '../utils/bnDigits';
import { FaChartBar, FaMoneyBill, FaUser, FaListAlt } from 'react-icons/fa';
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

// Dummy user analytics data
const stats = {
	totalTransactions: 120,
	totalIncome: 65000,
	totalExpense: 42000,
	totalDebts: 5,
	totalRequests: 2,
	totalBalance: 23000,
};

const monthlyData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
	income: [8000, 7000, 9000, 8500, 8000, 9500, 10000, 9000],
	expense: [5000, 4000, 6000, 5500, 5000, 6500, 7000, 6000],
};

const barData = {
	labels: monthlyData.labels.map(label => toBengaliDigits(label)),
	datasets: [
		{
			label: 'আয়',
			data: monthlyData.income.map(val => toBengaliDigits(val)),
			backgroundColor: 'rgba(34,197,94,0.7)',
		},
		{
			label: 'খরচ',
			data: monthlyData.expense.map(val => toBengaliDigits(val)),
			backgroundColor: 'rgba(239,68,68,0.7)',
		},
	],
};

const pieData = {
	labels: ['আয়', 'খরচ', 'দেনা', 'অনুরোধ'],
	datasets: [
		{
			label: 'সারাংশ',
			data: [
				toBengaliDigits(stats.totalIncome),
				toBengaliDigits(stats.totalExpense),
				toBengaliDigits(stats.totalDebts * 1000),
				toBengaliDigits(stats.totalRequests * 500)
			],
			backgroundColor: [
				'rgba(34,197,94,0.7)',
				'rgba(239,68,68,0.7)',
				'rgba(59,130,246,0.7)',
				'rgba(253,224,71,0.7)',
			],
		},
	],
};

const lineData = {
	labels: monthlyData.labels.map(label => toBengaliDigits(label)),
	datasets: [
		{
			label: 'ব্যালেন্স',
			data: monthlyData.income.map((inc, i) => toBengaliDigits(inc - monthlyData.expense[i])),
			borderColor: 'rgba(16,185,129,1)',
			backgroundColor: 'rgba(16,185,129,0.2)',
			fill: true,
			tension: 0.4,
		},
	],
};

export default function UserAnalyticsPage() {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4">
				<div className="mb-4">
					<a href="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold bg-white px-3 py-2 rounded shadow transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
						ড্যাশবোর্ডে ফিরে যান
					</a>
				</div>
				<h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2"><FaChartBar /> আপনার অ্যানালিটিক্স</h1>

				{/* Stats Cards */}
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
								<div className="bg-white rounded-xl shadow p-4 text-center">
									<div className="text-lg font-bold text-green-600">মোট আয়</div>
									<div className="text-2xl font-extrabold text-gray-500">৳{toBengaliDigits(stats.totalIncome.toLocaleString())}</div>
								</div>
								<div className="bg-white rounded-xl shadow p-4 text-center">
									<div className="text-lg font-bold text-red-600">মোট খরচ</div>
									<div className="text-2xl font-extrabold text-gray-500">৳{toBengaliDigits(stats.totalExpense.toLocaleString())}</div>
								</div>
								<div className="bg-white rounded-xl shadow p-4 text-center">
									<div className="text-lg font-bold text-indigo-600">মোট দেনা</div>
									<div className="text-2xl font-extrabold text-gray-500">{toBengaliDigits(stats.totalDebts)}</div>
								</div>
								<div className="bg-white rounded-xl shadow p-4 text-center">
									<div className="text-lg font-bold text-yellow-600">মোট অনুরোধ</div>
									<div className="text-2xl font-extrabold text-gray-500">{toBengaliDigits(stats.totalRequests)}</div>
								</div>
								<div className="bg-white rounded-xl shadow p-4 text-center">
									<div className="text-lg font-bold text-blue-600">মোট লেনদেন</div>
									<div className="text-2xl font-extrabold text-gray-500">{toBengaliDigits(stats.totalTransactions)}</div>
								</div>
								<div className="bg-white rounded-xl shadow p-4 text-center">
									<div className="text-lg font-bold text-green-700">বর্তমান ব্যালেন্স</div>
									<div className="text-2xl font-extrabold text-gray-500">৳{toBengaliDigits(stats.totalBalance.toLocaleString())}</div>
								</div>
							</div>

				{/* Charts Section */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								<div className="bg-white rounded-xl shadow p-4">
									<h2 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2"><FaMoneyBill /> মাসিক আয় বনাম খরচ</h2>
									<Bar data={barData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
								</div>
								<div className="bg-white rounded-xl shadow p-4">
									<h2 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2"><FaListAlt /> সারাংশ</h2>
									<Pie data={pieData} options={{ responsive: true }} />
								</div>
								<div className="bg-white rounded-xl shadow p-4">
									<h2 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2"><FaUser /> ব্যালেন্স ট্রেন্ড</h2>
									<Line data={lineData} options={{ responsive: true }} />
								</div>
							</div>
			</div>
		);
}
