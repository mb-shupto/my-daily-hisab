"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaMoneyBill,
  FaUser,
  FaListAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    document.title = "Daily Hisab";
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Daily Hisab</h1>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              হোম
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              আমাদের সম্পর্কে
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              যোগাযোগ
            </Link>
            <button
              onClick={handleLogin}
              className="text-gray-600 hover:text-blue-600"
              aria-label="Login"
            >
              লগইন
            </button>
            <button
              onClick={handleRegister}
              className="text-gray-600 hover:text-blue-600"
              aria-label="Register"
            >
              নিবন্ধন
            </button>
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-blue-600 p-2"
                >
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-blue-600 p-2"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-blue-600 p-2"
                >
                  যোগাযোগ
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogin}
                  className="block text-gray-600 hover:text-blue-600 p-2 w-full text-left"
                  aria-label="Login"
                >
                  লগইন
                </button>
              </li>
              <li>
                <button
                  onClick={handleRegister}
                  className="block text-gray-600 hover:text-blue-600 p-2 w-full text-left"
                  aria-label="Register"
                >
                  নিবন্ধন
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Daily Hisab-এ স্বাগতম
          </h2>
          <p className="text-lg md:text-xl mb-6">
            আপনার দৈনন্দিন আর্থিক হিসাব সহজে ও সুন্দরভাবে পরিচালনা করুন। আজই
            নিবন্ধন করুন এবং আপনার আর্থিক নিয়ন্ত্রণ নিন!
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogin}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-100 transition-colors duration-300"
              aria-label="Login"
            >
              লগইন
            </button>
            <button
              onClick={handleRegister}
              className="bg-yellow-400 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
              aria-label="Register"
            >
              নিবন্ধন
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            আমাদের বৈশিষ্ট্যসমূহ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <FaChartLine className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                ড্যাশবোর্ড
              </h4>
              <p className="text-gray-600">
                আপনার দৈনন্দিন লাভ, উপার্জন এবং খরচ এক নজরে দেখুন।
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <FaMoneyBill className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                লেনদেন
              </h4>
              <p className="text-gray-600">
                সহজে আপনার উপার্জন এবং খরচ রেকর্ড করুন এবং পরিচালনা করুন।
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <FaUser className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                পাওনা/দেনা
              </h4>
              <p className="text-gray-600">
                আপনার পাওনা এবং দেনার হিসাব সুনির্দিষ্টভাবে রাখুন।
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <FaMoneyBill className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                পেমেন্ট গেটওয়ে
              </h4>
              <p className="text-gray-600">
                সহজেই টাকা পাঠান এবং অনুরোধ করুন, বিকাশ/নগদ/রকেট সহ বিভিন্ন
                পেমেন্ট গেটওয়ে ব্যবহার করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            &copy; 2025 Daily Hisab. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/about" className="text-gray-300 hover:text-white">
              আমাদের সম্পর্কে
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              যোগাযোগ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
