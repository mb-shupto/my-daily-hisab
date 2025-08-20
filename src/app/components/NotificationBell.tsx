import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";

const notifications = [
  {
    id: 1,
    user: "রহিম",
    type: "debt-due",
    message:
      "আপনার দেনা রহিম-এর কাছে শীঘ্রই পরিশোধ করতে হবে। অনুগ্রহ করে ২০২৫-০৮-২৫ তারিখের মধ্যে ৳৫০০ পরিশোধ করুন।",
    time: "২ ঘণ্টা আগে",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    color: "bg-red-500",
    icon: (
      <svg
        className="w-2 h-2 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    user: "করিম",
    type: "debt-paid",
    message: "করিম তার ৳৩০০ দেনা আপনাকে পরিশোধ করেছে।",
    time: "৪ ঘণ্টা আগে",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    color: "bg-green-500",
    icon: (
      <svg
        className="w-2 h-2 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 10l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: 3,
    user: "সুমন",
    type: "transaction-request",
    message: "আপনি সুমন-এর কাছ থেকে ৳১৫০ টাকার লেনদেন অনুরোধ পেয়েছেন (লাঞ্চ)।",
    time: "৬ ঘণ্টা আগে",
    avatar: "https://i.pravatar.cc/150?img=3",
    color: "bg-blue-500",
    icon: (
      <svg
        className="w-2 h-2 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 10h12M10 4v12"
        />
      </svg>
    ),
  },
  {
    id: 5,
    user: "সিস্টেম",
    type: "profile-update",
    message: "আপনার প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে।",
    time: "গতকাল",
    avatar:
      "https://icons.veryicon.com/png/o/miscellaneous/cheyoudao_common/system-89.png",
    color: "bg-purple-500",
    icon: (
      <svg
        className="w-2 h-2 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m-4-4v4m8-4v4"
        />
      </svg>
    ),
  },
  {
    id: 6,
    user: "সিস্টেম",
    type: "category-added",
    message: "আপনি নতুন ক্যাটাগরি যোগ করেছেন: খাবার ও পানীয়।",
    time: "গতকাল",
    avatar:
      "https://icons.veryicon.com/png/o/miscellaneous/cheyoudao_common/system-89.png",
    color: "bg-yellow-500",
    icon: (
      <svg
        className="w-2 h-2 text-black"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6v4l2 2"
        />
      </svg>
    ),
  },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        title="Notifications"
        aria-haspopup="true"
        id="dropdownNotificationButton"
        ref={bellRef}
        onClick={() => setOpen((prev) => !prev)}
        className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none "
        type="button"
      >
        <FaBell className="w-5 h-5" />
        <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 "></div>
      </button>
      {open && (
        <div
          id="dropdownNotification"
          ref={dropdownRef}
          className="z-20 absolute right-0 mt-2 w-80 bg-white divide-y divide-gray-100 rounded-lg shadow-sm  "
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 ">
            Notifications
          </div>
          <div className="divide-y divide-gray-100 ">
            {notifications.map((n) => (
              <a
                key={n.id}
                href="#"
                className="flex px-4 py-3 hover:bg-blue-200 "
              >
                <div className="shrink-0 relative">
                  <Image
                    className="rounded-full"
                    src={n.avatar}
                    alt={n.user + " image"}
                    width={44}
                    height={44}
                  />
                  <div
                    className={`absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 ${n.color} border border-white rounded-full `}
                  >
                    {n.icon}
                  </div>
                </div>
                <div className="w-full ps-3">
                  <div className="text-gray-500 text-sm mb-1.5 ">
                    {n.id === 1 ? (
                      <>
                        New message from{" "}
                        <span className="font-semibold text-gray-900 ">
                          {n.user}
                        </span>
                        : &quot;{n.message}&quot;
                      </>
                    ) : n.id === 2 ? (
                      <>
                        <span className="font-semibold text-gray-900 ">
                          {n.user}
                        </span>{" "}
                        {n.message}
                      </>
                    ) : n.id === 3 ? (
                      <>
                        <span className="font-semibold text-gray-900 ">
                          {n.user}
                        </span>{" "}
                        {n.message}
                      </>
                    ) : n.id === 5 ? (
                      <>
                        <span className="font-semibold text-gray-900 ">
                          {n.user}
                        </span>{" "}
                        {n.message}
                      </>
                    ) : null}
                  </div>
                  <div className="text-xs text-blue-600 ">{n.time}</div>
                </div>
              </a>
            ))}
          </div>
          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 "
          >
            <div className="inline-flex items-center ">
              <svg
                className="w-4 h-4 me-2 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              View all
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
