"use client";
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (username === 'admin' && password === '1234') {
			setError('');
			toast.success('Login successful!', {
				position: 'top-center',
				autoClose: 1500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
			});
			setTimeout(() => {
				router.push('/admin');
			}, 1600);
		} else {
			setError('ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
		}
	};

		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
						<div className="absolute top-6 left-6">
							<Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold bg-white px-3 py-2 rounded shadow transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
								Back to Home
							</Link>
						</div>
				<form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
					<h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Admin Login</h2>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Username</label>
						<input
						type="text"
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-500"
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder="Input username"
						autoComplete="username"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Password</label>
					<input
						type="password"
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-500"
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder="Password here"
						autoComplete="current-password"
					/>
				</div>
				{error && <p className="text-red-500 mb-4 text-center">{error}</p>}
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
				>
					Login
				</button>
			</form>
			<ToastContainer />
		</div>
	);
}
