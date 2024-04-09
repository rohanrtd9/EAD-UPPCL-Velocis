import Header from "../../../component/Header";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
function KV33ConsumerFeederData() {
  return (
    <>
      <Header
        title="33KV & Above Consumer Feeder Master"
        action={{
          button: "Add",
          path: "/AddSubstation",
        }}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3">Division</th>
              <th className="p-3">33KV & Above Consumer Feeder</th>
              <th className="p-3">Feeder Code</th>
              <th className="p-3">Category</th>
              <th className="p-3">Feeder Voltage</th>
              <th className="p-3">Active / InActive</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="p-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </td>
              <td className="p-3">PHOOL BAGH</td>
              <td className="p-3">33 KV BSNL </td>
              <td className="p-3">NA</td>
              <td className="p-3">
                TAPPED(WITH DISTRIBUTION SUBSTATION FEEDER)
              </td>
              <td className="p-3">33</td>
              <td className="p-3">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default KV33ConsumerFeederData;
