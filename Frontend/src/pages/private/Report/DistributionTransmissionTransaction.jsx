import Header from "./../../../component/Header";
import {
  label,
  select,
  btn,
  btnSuccess,
  btnGrey,
} from "../../../utils/tailwindClasses";

function DistributionTransmissionTransaction() {
  return (
    <>
      <Header
        title="Distribution and Transmission Transaction"
        action={{
          button: "",
          path: "/addDistrict",
        }}
      />
      <div className="mt-10 w-full p-6 bg-gray-200 border border-gray-200 rounded-lg mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Energy Account Month</label>
            <select className={select} defaultValue="">
              <option>Select Month</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select className={select} defaultValue="">
              <option>Select</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <button className={btnSuccess + " w-1/2"}>Search</button>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-3">
                S.No.
              </th>
              <th className="p-3">District</th>
              <th className="p-3">Primary Substations (Transmission)</th>
              <th className="p-3">T-D Point Name (Transmission Bay)</th>
              <th className="p-3">Mapped Distribution Division</th>
              <th className="p-3">Mapped Distribution Circle</th>
              <th className="p-3">Mapped Distribution Zone</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-3" colSpan={7}>
                No record
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default DistributionTransmissionTransaction;
