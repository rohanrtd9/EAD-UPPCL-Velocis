import Header from "../../../component/Header";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
function KV33ConsumerFeederData() {
  return (
    <>
      <Header
        title="33KV & Above Consumer Feeder Master"
        action={{
          button: "Add Substation",
          path: "/AddSubstation",
        }}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Distribution Sub-Station Name
              </th>
              <th scope="col" className="px-6 py-3">
                Distribution Sub-Station Code
              </th>
              <th scope="col" className="px-6 py-3">
                Voltage of Unit Sub-Station
              </th>
              <th scope="col" className="px-6 py-3">
                Junior Engineer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Junior Engineer Mobile No.
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                SARSAUL_24842
              </td>
              <td className="px-6 py-4">24842</td>
              <td className="px-6 py-4">33</td>
              <td className="px-6 py-4">Rajan Kumar</td>
              <td className="px-6 py-4">9999999999</td>

              <td className="px-6 py-4 flex">
                <TrashIcon className="h-5 w-5" />
                <PencilSquareIcon className="h-5 w-5 ms-2" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default KV33ConsumerFeederData;
