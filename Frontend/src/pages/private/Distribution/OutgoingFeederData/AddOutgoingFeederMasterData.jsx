import React, { useState } from "react";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import {
  label,
  select,
  btn,
  input,
  btnSuccess,
  btnGrey,
  removebtn,
} from "../../../../utils/tailwindClasses";

function AddOutgoingFeederMasterData() {
  const [rows, setRows] = useState([{ id: Date.now(), isAddButton: true }]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: Date.now(), isAddButton: false },
    ]);
  };

  const handleRemoveRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <>
      <Header
        title="Add Distribution Outgoing Feeder Details"
        action={{
          button: "Outgoing Feeder List",
          path: "/outgoingFeederMaterData",
        }}
      />

      <FormPanel>
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
            <input className={input} placeholder=" " />
            <label className={label}>Distribution Sub-Station Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Feeder Name</label>
          </div>
        </div>

        <div className="col-span-3 flex justify-between">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={btnSuccess + " w-1/5"}>Export</button>
          <button className={btnGrey + " w-1/5"}>Reset</button>
        </div>
      </FormPanel>

      <Table>
        <Thead>
          <Tr>
            <Th>Feeder Voltage</Th>
            <Th>Name Of Outgoing Feeder</Th>
            <Th>Category Of Feeder</Th>
            <Th>Project Area</Th>
            <Th>Supply Area</Th>
            <Th>Feeder Code</Th>
            <Th>Meter (Make & Type)</Th>
            <Th>Meter (SL.No)</Th>
            <Th>No Of Consumers</Th>
            <Th>Overall MF</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={row.id}>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                <input className={input} placeholder=" " />
              </Td>
              <Td>
                {row.isAddButton ? (
                  <button className={btn} onClick={handleAddRow}>
                    Add
                  </button>
                ) : (
                  <button
                    className={removebtn + " bg-red-500"}
                    onClick={() => handleRemoveRow(row.id)}
                  >
                    Remove
                  </button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default AddOutgoingFeederMasterData;
