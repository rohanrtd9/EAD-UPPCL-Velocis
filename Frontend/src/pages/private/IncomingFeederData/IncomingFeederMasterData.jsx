import Header from "../../../component/Header";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

function IncomingFeederMasterData() {
  return (
    <>
      <Header
        title="Incoming Feeder Master Data"
        action={{
          button: "",
          path: "/substations",
        }}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Division
              </th>
              <th scope="col" className="px-6 py-3">
                Distribution Sub-Station Name
              </th>
              <th scope="col" className="px-6 py-3">
                Feeder Name
              </th>
              <th scope="col" className="px-6 py-3">
                Feeder Voltage
              </th>

              <th scope="col" className="px-6 py-3">
                Active / InActive
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </td>
              <td className="px-6 py-4">VIKAS NAGAR</td>
              <td className="px-6 py-4">SINGHPUR</td>
              <td className="px-6 py-4">INC-2</td>
              <td className="px-6 py-4">11</td>
              <td className="px-6 py-4 flex">Active</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2
              </td>
              <td className="px-6 py-4">VIKAS NAGAR</td>
              <td className="px-6 py-4">SINGHPUR</td>
              <td className="px-6 py-4">INC-1</td>
              <td className="px-6 py-4">11</td>
              <td className="px-6 py-4 flex">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default IncomingFeederMasterData;
