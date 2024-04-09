import Header from "./../../../component/Header";

function MasterSubstationWithBayPoint() {
  return (
    <>
      <Header
        title="Master Substation With BayPoint"
        action={{
          button: "",
          path: "/addDistrict",
        }}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-3">
                S.No.
              </th>
              <th className="p-3">Discom</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Circle</th>
              <th className="p-3">Division</th>
              <th className="p-3">Distribution Sub-station Name</th>
              <th className="p-3">Distribution Sub-station Code</th>
              <th className="p-3">Voltage level of Sub-station</th>
              <th className="p-3">T-D Point Name (Transmission Bay)</th>
              <th className="p-3">Primary substations (Transmission)</th>
              <th className="p-3">Junior Engineer Name</th>
              <th className="p-3">Junior Engineer Mobile Number</th>
              <th className="p-3">Mapped EDD</th>
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
              <td className="p-3">POORVANCHAL</td>
              <td className="p-3">PRAYAGRAJ-II</td>
              <td className="p-3">EDC I PRAYAGRAJ</td>
              <td className="p-3">EDD I PRAYAGRAJ</td>
              <td className="p-3">BHODI</td>
              <td className="p-3"></td>
              <td className="p-3">33</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3">PRMOD KUSHWAHA</td>
              <td className="p-3">9193304450</td>
              <td className="p-3">EDD I PRAYAGRAJ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default MasterSubstationWithBayPoint;
