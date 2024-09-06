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
    // Trigger live search here, e.g., API call to filter data
  };

  const handleEntriesChange = (event) => {
    setEntries(event.target.value);
    // Trigger data fetching with new entries count here, e.g., API call with pagination
  };

  // Simulate loading data
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // simulate a 2-second loading time
  };

  return (
    <div className="mb-3 bg-gray-200 mt-3">
      <div className="flex justify-between items-center p-4">
        <p className="font-semibold">{title}</p>
        <div className="flex">
          <button
            className={btnGrey}
            onClick={simulateLoading} // Simulate loading when clicking export button
          >
            Export to Excel
          </button>
          {button !== "" && (
            <Link to={path}>
              <button className={btn + " ms-2"}>{button}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
