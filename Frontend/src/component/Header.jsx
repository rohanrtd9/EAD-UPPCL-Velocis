import { Link } from "react-router-dom";
import { btn, btnGrey, input, label, select } from "../utils/tailwindClasses";

function Header({ title, action }) {
  const { button, path } = action;
  //console.log(title);
  return (
    <div className="mb-3 bg-gray-200 mt-3">
      <div className="flex justify-between items-center p-4">
        <p className="font-semibold">{title}</p>
        <div className="flex">
          <button className={btnGrey}>Export to Excel</button>
          {button !== "" && (
            <Link to={path}>
              <button className={btn + " ms-2"}>{button}</button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mb-3 p-4 border-b border-gray-200">
        <div className="relative z-0 w-1/4 group flex">
          <label className="py-2.5 me-2 text-sm">Show</label>
          <select
            className="block text-sm w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
            defaultValue={"25"}
          >
            <option>Select entries</option>
            <option value={"25"}>25</option>
            <option value={"50"}>50</option>
            <option value={"100"}>100</option>
          </select>
          <label className="py-2.5 ms-2 text-sm">Entries</label>
        </div>
        <div className="relative z-0 w-1/4 group">
          <input className={input} placeholder=" " />
          <label className={label}>Search</label>
        </div>
      </div>
    </div>
  );
}
export default Header;
