import { useState } from "react";
import { Link } from "react-router-dom";
//import { User } from "@heroicons/react/24/solid";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
        onClick={toggleDropdown}
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Link>Profile</Link>
          </li>
          <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Link>Setting</Link>
          </li>
          <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Link>Logout</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
