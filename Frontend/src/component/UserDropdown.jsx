import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData === null) {
      navigate("/login", { replace: true });
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  // return (
  //   <div className="relative">
  //     <button
  //       className="flex items-center rounded-full hover:bg-gray-400
  //       focus:outline-none focus:bg-gray-400"
  //       onClick={toggleDropdown}
  //     >
  //       <AccountCircleIcon sx={{ fontSize: 30 }} />
  //     </button>
  //     {isOpen && (
  //       <ul
  //         className="absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-10"
  //         style={{ backgroundColor: "#f7f7f7" }} // Apply the background color here
  //       >
  //         <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500">
  //           <button className="w-full">Profile</button>
  //         </li>
  //         <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500">
  //           <button className="w-full">Setting</button>
  //         </li>
  //         <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500">
  //           <button className="w-full" onClick={logout}>
  //             Logout
  //           </button>
  //         </li>
  //       </ul>
  //     )}
  //   </div>
  // );
};

export default Dropdown;
