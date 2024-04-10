import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Header from "../../../component/Header";

function ZoneList() {
  return (
    <>
      <Header
        title="Zone (Distribution)"
        action={{
          button: "Add Zone",
          path: "/addZone",
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
                Zone
              </th>
              <th scope="col" className="px-6 py-3">
                Zone Code
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
                1
              </td>
              <td className="px-6 py-4">Purvanchal</td>
              <td className="px-6 py-4">UPPCL-PVL</td>
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
export default ZoneList;
