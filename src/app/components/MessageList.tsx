import React from "react";
import { Avatar } from "flowbite-react";

export type Message = {
  id: number;
  sender: string;
  senderAvatar: string;
  text: string;
  time: string;
  isOwn?: boolean;
};

const messages: Message[] = [
  {
    id: 1,
    sender: "রহিম ট্রেডার্স",
    senderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "আপনার অর্ডারটি প্রস্তুত।",
    time: "১০:৩০ AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "আপনি",
    senderAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    text: "ধন্যবাদ! দ্রুত পাঠান।",
    time: "১০:৩২ AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "করিম এন্টারপ্রাইজ",
    senderAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "পেমেন্ট কনফার্ম হয়েছে।",
    time: "১১:০০ AM",
    isOwn: false,
  },
];

export default function MessageList({ messageList = messages }: { messageList?: Message[] }) {
  return (
    <div className="flex flex-col gap-4">
      {messageList.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-end gap-2 ${msg.isOwn ? "justify-end" : ""}`}
        >
          {!msg.isOwn && <Avatar img={msg.senderAvatar} rounded size="md" />}
          <div
            className={`rounded-lg px-4 py-2 max-w-xs shadow text-sm ${
              msg.isOwn
                ? "bg-green-100 text-green-900"
                : "bg-blue-100 text-blue-900"
            }`}
          >
            <span className="font-bold">{msg.sender}:</span> {msg.text}
            <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
          </div>
          {msg.isOwn && <Avatar img={msg.senderAvatar} rounded size="md" />}
        </div>
      ))}
    </div>
  );
}
