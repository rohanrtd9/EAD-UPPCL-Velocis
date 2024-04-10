import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center rounded-full hover:bg-gray-400 
        focus:outline-none focus:bg-gray-400"
        onClick={toggleDropdown}
      >
        <AccountCircleIcon sx={{ fontSize: 30 }} />
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
