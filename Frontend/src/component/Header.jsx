import { Link } from "react-router-dom";
import { useState } from "react";
import { btn, btnGrey, input, label, select } from "../utils/tailwindClasses";

function Header({ title, action }) {
  const { button, path } = action;
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEntriesChange = (event) => {
    setEntries(event.target.value);
    // Trigger data fetching with new entries count here, e.g., API call with pagination
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // simulate a 2-second loading time
  };

  return (
    <>
      <div className="fixed-nav  bg-gray-200 shadow-md z-10">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center space-x-2">
            <button
              className={`${btnGrey} transition duration-200 hover:bg-gray-300 px-3 py-1 text-sm`}
              onClick={simulateLoading}
            >
              {isLoading ? "Loading..." : "Export to Excel"}
            </button>
            {button && (
              <Link to={path}>
                <button
                  className={`${btn} transition duration-200 hover:bg-blue-500 px-3 py-1 text-sm`}
                >
                  {button}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "100px" }}></div>
    </>
  );
}
export default Header;
