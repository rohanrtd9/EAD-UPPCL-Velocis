import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import {
  label,
  select,
  btn,
  btnSuccess,
  btnGrey,
} from "../../../../utils/tailwindClasses";

const CategoryCheckBox = ({ title }) => {
  return (
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
      <div className="flex items-center ps-3">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {title}
        </label>
      </div>
    </li>
  );
};

function MonthlyLineLossReport() {
  return (
    <>
      <Header
        title="Monthly Line Loss Report"
        action={{
          button: "Substations",
          path: "/substations",
        }}
      />

      <FormPanel>
        <div className="col-span-3 w-full">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Category of Feeder
          </h3>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <CategoryCheckBox title="I" />
            <CategoryCheckBox title="IND" />
            <CategoryCheckBox title="R" />
            <CategoryCheckBox title="U" />
            <CategoryCheckBox title="M-25" />
            <CategoryCheckBox title="M-50" />
            <CategoryCheckBox title="Tehsil" />
          </ul>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Discom</label>
            <select className={select} defaultValue="">
              <option>Select a Discom</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Zone</label>
            <select className={select} defaultValue="">
              <option>Select Zone</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Circle</label>
            <select className={select} defaultValue="">
              <option>Select Circle</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Division</label>
            <select className={select} defaultValue="">
              <option>Select Division</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Name of Substation</label>
            <select className={select} defaultValue=""></select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Energy Account Month</label>
            <select className={select} defaultValue="">
              <option>Select Month</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select className={select} defaultValue="">
              <option>Select Year</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 flex justify-between">
          <button className={btn + " w-1/5"}>Submit</button>
        </div>
      </FormPanel>
    </>
  );
}
export default MonthlyLineLossReport;
