import {
  FaTachometerAlt,
  FaHandHoldingUsd,
  FaUser,
  FaSignOutAlt,
  FaInbox,
} from "react-icons/fa";

export default function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-gray-50 text-black`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-teal-100 group transition-colors"
            >
              <FaTachometerAlt className="w-5 h-5 text-teal-500 group-hover:text-teal-700" />
              <span className="ms-3">ড্যাশবোর্ড</span>
            </a>
          </li>
          <li>
            <a
              href="/transactions"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-lime-100 group transition-colors"
            >
              <FaUser className="w-5 h-5 text-lime-500 group-hover:text-lime-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                লেন-দেন এর হিসাব
              </span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full"></span>
            </a>
          </li>
          <li>
            <a
              href="/debts"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-purple-100 group transition-colors"
            >
              <FaHandHoldingUsd className="w-5 h-5 text-purple-500 group-hover:text-purple-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                দেনা-পাওয়ার হিসাব
              </span>
            </a>
          </li>
          <li>
            <a
              href="/inbox"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-100  group transition-colors"
            >
              <FaInbox className="w-5 h-5 text-blue-500 group-hover:text-blue-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-red-500 rounded-full "></span>
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-orange-100 group transition-colors"
            >
              <FaUser className="w-5 h-5 text-orange-500 group-hover:text-orange-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">প্রোফাইল</span>
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-red-100  group transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5 text-green-500 group-hover:text-green-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">লগআউট</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
