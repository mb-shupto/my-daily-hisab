"use client";

import React, { useState, useEffect } from "react";
import { FaMoneyBill, FaShoppingBag, FaUser } from "react-icons/fa";
import AddTransactionModal from "../components/AddTransactionModal";
import AddDebtModal from "../components/AddDebtModal";
import EditTransactionModal from "../components/EditTransactionModal";
import EditDebtModal from "../components/EditDebtModal";
import Menubar from "../components/Menubar";
import Sidebar from "../components/Sidebar";
import NotificationBell from "../components/NotificationBell";  

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Transaction {
  id: string;
  type: "earning" | "expense";
  amount: number;
  description: string;
  date: string;
}

interface Debt {
  id: string;
  person: string;
  amount: number;
  isOwedToUser: boolean;
  date: string;
}

export default function Dashboard() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [isEditDebtModalOpen, setIsEditDebtModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  );
  const [editDebt, setEditDebt] = useState<Debt | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    const storedDebts = localStorage.getItem("debts");
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
    if (storedDebts) setDebts(JSON.parse(storedDebts));
  }, []);

  // Save data to localStorage whenever transactions or debts change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("debts", JSON.stringify(debts));
  }, [transactions, debts]);

  const handleAddTransaction = (
    type: "earning" | "expense",
    amount: number,
    description: string
  ) => {
    const transaction: Transaction = {
      id: Math.random().toString(36).slice(2),
      type,
      amount,
      description,
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleAddDebt = (
    person: string,
    amount: number,
    isOwedToUser: boolean
  ) => {
    const debt: Debt = {
      id: Math.random().toString(36).slice(2),
      person,
      amount,
      isOwedToUser,
      date: new Date().toISOString(),
    };
    setDebts((prev) => [...prev, debt]);
  };

  const handleEditTransaction = (
    id: string,
    type: "earning" | "expense",
    amount: number,
    description: string
  ) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, type, amount, description, date: new Date().toISOString() }
          : t
      )
    );
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditDebt = (
    id: string,
    person: string,
    amount: number,
    isOwedToUser: boolean
  ) => {
    setDebts((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              person,
              amount,
              isOwedToUser,
              date: new Date().toISOString(),
            }
          : d
      )
    );
  };

  const handleDeleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const todayEarnings = transactions
    .filter((t) => t.type === "earning")
    .reduce((sum, t) => sum + t.amount, 0);
  const todayExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const todayProfit = todayEarnings - todayExpenses;

  const totalOwedToUser = debts
    .filter((d) => d.isOwedToUser)
    .reduce((sum, d) => sum + d.amount, 0);
  const totalOwedByUser = debts
    .filter((d) => !d.isOwedToUser)
    .reduce((sum, d) => sum + d.amount, 0);

  const getProfitColor = (profit: number) => {
    if (profit > 0) return "text-green-500";
    if (profit < 0) return "text-red-500";
    return "text-gray-500";
  };

  // Calculate daily profit for the graph
  const getDailyProfit = () => {
    const dailyData: { [date: string]: number } = {};
    transactions.forEach((t) => {
      const dateKey = new Date(t.date).toLocaleDateString("bn-BD", {
        dateStyle: "short",
      });
      if (!dailyData[dateKey]) dailyData[dateKey] = 0;
      if (t.type === "earning") dailyData[dateKey] += t.amount;
      if (t.type === "expense") dailyData[dateKey] -= t.amount;
    });
    return dailyData;
  };

  const dailyProfit = getDailyProfit();
  const labels = Object.keys(dailyProfit).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Calculate daily earnings, expenses, and profit
  const dailyEarnings: { [date: string]: number } = {};
  const dailyExpenses: { [date: string]: number } = {};
  
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString('en-CA');
    if (transaction.type === 'earning') {
      dailyEarnings[date] = (dailyEarnings[date] || 0) + transaction.amount;
    } else {
      dailyExpenses[date] = (dailyExpenses[date] || 0) + transaction.amount;
    }
  });

  const earningsData = labels.map((label) => dailyEarnings[label] || 0);
  const expensesData = labels.map((label) => dailyExpenses[label] || 0);
  const profitData = labels.map((label) => dailyProfit[label] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "আয়",
        data: earningsData,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: false,
        borderWidth: 3,
      },
      {
        label: "খরচ",
        data: expensesData,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        fill: false,
        borderWidth: 3,
      },
      {
        label: "নিট লাভ",
        data: profitData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "আর্থিক ট্রেন্ড বিশ্লেষণ",
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'তারিখ',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'টাকার পরিমাণ (৳)',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          className="p-3 rounded-xl text-slate-700 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 border border-white/20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar: hidden on mobile, shrunk on small screens */}
      <div
        className={`fixed top-0 right-0 h-full z-40 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:block w-56 md:w-64 bg-white shadow-lg md:shadow-none`}
      >
        <Sidebar />
      </div>
      <main className="flex-1 md:mr-64 flex flex-col items-center justify-center p-2 sm:p-4 min-w-0 w-full">
        <Menubar
          isOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />
        <section className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 w-full max-w-4xl">
          <div className="w-full bg-white rounded-xl shadow-lg p-2 sm:p-4 transform transition-all duration-300 hover:scale-100">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Daily Hisab
            </h1>

            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 sm:mb-6">
              <p className="text-sm font-semibold text-gray-500">আজকের লাভ</p>
              <div
                className={`text-5xl font-extrabold ${getProfitColor(
                  todayProfit
                )} transition-colors duration-300`}
              >
                <span className="text-3xl">৳</span> {todayProfit.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-center">
              <div className="bg-green-100 rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
                <FaMoneyBill className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">উপার্জন</p>
                <p className="text-lg font-bold text-green-600">
                  ৳ {todayEarnings.toFixed(2)}
                </p>
              </div>
              <div className="bg-red-100 rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
                <FaShoppingBag className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">খরচ</p>
                <p className="text-lg font-bold text-red-600">
                  ৳ {todayExpenses.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-100 rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
                <FaUser className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">পাওনা</p>
                <p className="text-lg font-bold text-blue-600">
                  ৳ {totalOwedToUser.toFixed(2)}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
                <FaUser className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">দেনা</p>
                <p className="text-lg font-bold text-yellow-600">
                  ৳ {totalOwedByUser.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="w-full max-w-xl mt-4 sm:mt-8">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              লেনদেনের সারাংশ
            </h2>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Buttons below the graph */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 mt-4 sm:mt-8 w-100">
            <button
              type="button"
              className="w-full sm:w-auto text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:mb-0"
              onClick={() => setIsTransactionModalOpen(true)}
              title="Add Transaction"
            >
              লেন-দেন যোগ করুন
            </button>

            <button
              type="button"
              className="w-full sm:w-auto text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => setIsDebtModalOpen(true)}
              title="Add Debt"
            >
              দেনা-পাওনা যোগ করুন
            </button>
          </div>

          {isTransactionModalOpen && (
            <AddTransactionModal
              onClose={() => setIsTransactionModalOpen(false)}
              onAdd={handleAddTransaction}
            />
          )}
          {isDebtModalOpen && (
            <AddDebtModal
              onClose={() => setIsDebtModalOpen(false)}
              onAdd={handleAddDebt}
            />
          )}
          {isEditTransactionModalOpen && editTransaction && (
            <EditTransactionModal
              transaction={editTransaction}
              onClose={() => setIsEditTransactionModalOpen(false)}
              onEdit={handleEditTransaction}
            />
          )}
          {isEditDebtModalOpen && editDebt && (
            <EditDebtModal
              debt={editDebt}
              onClose={() => setIsEditDebtModalOpen(false)}
              onEdit={handleEditDebt}
            />
          )}
        </section>
      </main>
    </div>
  );
}
