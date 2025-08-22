"use client";
import React from "react";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Menubar from "../../components/Menubar";
import CreateMessageModal from "../../components/CreateMessageModal";
import { useRouter } from "next/navigation";

export default function InboxPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const chats = [
    {
      name: "রহিম আলম স্টোর",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "আপনার অর্ডারটি প্রস্তুত আছে।",
      time: "৪:৩০ PM",
      unread: 4,
      online: true,
    },
    {
      name: "রহিম ট্রেডার্স",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      lastMessage: "মালামাল এসে পৌঁছেছে।",
      time: "৪:৩০ PM",
      unread: 1,
      online: false,
    },
    {
      name: "সুমন স্টোর",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "নতুন সময়সূচী নির্ধারিত হয়েছে।",
      time: "৪:৩০ PM",
      unread: 1,
      online: true,
    },
    {
      name: "করিম এন্টারপ্রাইজ",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      lastMessage: "আপনার টাকা ফেরত দেওয়া হয়েছে।",
      time: "৪:৩০ PM",
      unread: 0,
      online: true,
    },
    {
      name: "জাহাঙ্গীর গোডাউন",
      avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64&facepad=2",
      lastMessage: "টাকা ফেরত দেওয়ার জন্য অনুরোধ করা হয়েছে।",
      time: "৪:৩০ PM",
      unread: 24,
      online: false,
    },
    {
      name: "মালেক মিয়া",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      lastMessage: "🔊 অডিও বার্তা",
      time: "গতকাল",
      unread: 0,
      online: false,
    },
    {
      name: "সাদমান ট্রেডার্স",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      lastMessage: "📊 ভোট",
      time: "গতকাল",
      unread: 0,
      online: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Menubar isOpen={false} toggleMenu={() => {}} />
        <main className="flex flex-1 min-h-0 h-full">
          {/* Left: Chat List */}
          <div className="w-150 h-full bg-white rounded-xl shadow-lg flex flex-col border-r border-gray-200">
            <div className="p-4 pb-0">
              <button
                className="flex items-center gap-2 mb-4 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
                onClick={() => router.push("/dashboard")}
              >
                <FaArrowLeft className="w-4 h-4" />
                ড্যাশবোর্ডে ফিরে যান
              </button>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900">সাম্প্রতিক চ্যাট</h2>
                <button
                  title="নতুন চ্যাট শুরু করুন"
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FaPlus className="w-4 h-4 text-gray-600" />
                </button>
                <CreateMessageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSend={(recipient, message) => {
                  // Add your send logic here
                  setIsModalOpen(false);
                }}
              />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="খুঁজুন"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200 text-sm bg-gray-50"
                />
              </div>
            </div>
            <ul className="divide-y divide-gray-100 overflow-y-auto flex-1 min-h-0">
              {chats.map((chat, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 py-3 px-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/inbox/${chat.name.replace(/\s+/g, "-").toLowerCase()}`)}
                >
                  <div className="relative">
                    <Image
                      title={chat.name + " avatar"}
                      src={chat.avatar}
                      alt={chat.name + " avatar"}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover"
                      priority
                    />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 truncate">{chat.name}</span>
                      <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{chat.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 truncate">{chat.lastMessage}</span>
                      {chat.unread > 0 && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Message Preview/Empty State */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">একটি মেসেজ নির্বাচন করুন</h2>
              <p className="text-gray-500 mb-6">আপনার বর্তমান চ্যাট থেকে একটি নির্বাচন করুন, নতুন শুরু করুন, অথবা শুধু অপেক্ষা করুন।</p>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => setIsModalOpen(true)}
              >
                নতুন মেসেজ
              </button>
              <CreateMessageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSend={(recipient, message) => {
                  // Add your send logic here
                  setIsModalOpen(false);
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
