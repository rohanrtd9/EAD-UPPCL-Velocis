import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import {
  btn,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";

function OutgoingFeederMasterData() {
  return (
    <>
      <Header
        title="Distribution Outgoing Feeder Master Data"
        action={{
          button: "Add DOFD",
          path: "/AddOutgoingFeederMasterData",
        }}
      />

      <FormPanel>
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
          <div className="relative z-0 w-full group">
            <label className={label}>Name of Substation</label>
            <select className={select} defaultValue="">
              <option value="">Select Substation</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 justify-between space-x-4">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={removebtn + " bg-red-500 w-1/5"}>Reset</button>
        </div>
      </FormPanel>
      <Table>
        <Thead>
          <Th>S.No.</Th>
          <Th>Division Name</Th>
          <Th>Substation Name</Th>
          <Th>Incoming Feeder Name</Th>
          <Th>Action</Th>
          <Th>Status</Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>EDD I AGRA</Td>
            <Td>DIGNER_24462</Td>
            <Td>INC-1</Td>
            <Td>
              <PencilSquareIcon className="h-5 w-5 ms-2" />
            </Td>
            <Td>
              <button className={btn}>Active</button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default OutgoingFeederMasterData;
