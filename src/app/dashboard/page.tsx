"use client";

import React, { useState, useEffect } from "react";
import { FaMoneyBill, FaShoppingBag, FaUser } from "react-icons/fa";
import AddTransactionModal from "../components/AddTransactionModal";
import AddDebtModal from "../components/AddDebtModal";
import EditTransactionModal from "../components/EditTransactionModal";
import EditDebtModal from "../components/EditDebtModal";
import Menubar from "../components/Menubar";
import Sidebar from "../components/Sidebar";

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
  const data = labels.map((label) => dailyProfit[label]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "দৈনিক লাভ",
        data,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "দৈনিক লাভের গ্রাফ",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
            <Sidebar />
            <div className="flex-1 sm:ml-64 flex flex-col items-center justify-center p-4">
      <Menubar
        isOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-4 transform transition-all duration-300 hover:scale-105">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Daily Hisab
          </h1>


          
          <div className="flex flex-col items-center justify-center space-y-4 mb-6">
            <p className="text-sm font-semibold text-gray-500">আজকের লাভ</p>
            <div
              className={`text-5xl font-extrabold ${getProfitColor(
                todayProfit
              )} transition-colors duration-300`}
            >
              <span className="text-3xl">৳</span> {todayProfit.toFixed(2)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
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
        <div className="w-full max-w-xl mt-8">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
            লেনদেনের সারাংশ
          </h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Buttons below the graph */}
        <div className="flex space-x-10 mt-8">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => setIsTransactionModalOpen(true)}
            title="Add Transaction"
          >
            লেন-দেন যোগ করুন
          </button>

          <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setIsDebtModalOpen(true)}
          title="Add Debt"
          >
          দেনা-পাওনা যোগ করুন</button>
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
      </div>
      </div>
    </div>
  );
}
