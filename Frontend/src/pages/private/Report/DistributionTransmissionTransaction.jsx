import Header from "./../../../component/Header";
import {
  label,
  select,
  btn,
  btnSuccess,
  btnGrey,
} from "../../../utils/tailwindClasses";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../component/Table";

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
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select className={select} defaultValue="">
              <option>Select</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <button className={btnSuccess + " w-1/2"}>Search</button>
          </div>
        </div>
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>District</Th>
            <Th>Primary Substations (Transmission)</Th>
            <Th>T-D Point Name (Transmission Bay)</Th>
            <Th>Mapped Distribution Division</Th>
            <Th>Mapped Distribution Circle</Th>
            <Th>Mapped Distribution Zone</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colspan={7}>No record</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default DistributionTransmissionTransaction;
