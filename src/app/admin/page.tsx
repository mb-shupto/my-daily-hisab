import AdminSidebar from './components/Sidebar';
import { FaUsers, FaMoneyCheckAlt, FaChartBar, FaUserShield, FaListAlt } from 'react-icons/fa';

export default function AdminLanding() {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex text-black">
				<AdminSidebar />
				<main className="flex-1 flex flex-col items-center justify-center p-4">
					<h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow-lg">Admin Dashboard</h1>
					<p className="text-lg text-gray-600 mb-10 text-center max-w-xl">Welcome to the admin panel. Manage users, transactions, debts, and view analytics for the entire system.</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
						{/* Users Card */}
						<div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
							<FaUsers className="w-12 h-12 text-blue-500 mx-auto mb-4" />
							<h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">User Management</h4>
							<p className="text-gray-600 text-center">View, search, edit, and delete users. Monitor user activity and roles.</p>
						</div>

						{/* Transactions Card */}
						<div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
							<FaMoneyCheckAlt className="w-12 h-12 text-green-500 mx-auto mb-4" />
							<h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">Transactions</h4>
							<p className="text-gray-600 text-center">Manage all user transactions, review payment history, and resolve disputes.</p>
						</div>

						{/* Debts Card */}
						<div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
							<FaListAlt className="w-12 h-12 text-purple-500 mx-auto mb-4" />
							<h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">Debts & Requests</h4>
							<p className="text-gray-600 text-center">Monitor all debts, approve/reject money requests, and manage settlements.</p>
						</div>

						{/* Analytics Card */}
						<div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
							<FaChartBar className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
							<h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">Analytics & Reports</h4>
							<p className="text-gray-600 text-center">View system-wide financial analytics, trends, and export reports.</p>
						</div>

						{/* Security Card */}
						<div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
							<FaUserShield className="w-12 h-12 text-red-500 mx-auto mb-4" />
							<h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">Admin Controls</h4>
							<p className="text-gray-600 text-center">Manage admin roles, permissions, and system settings securely.</p>
						</div>
					</div>
				</main>
			</div>
		);
}
