import React, { useState } from "react";
import Header from "../../../../component/Header";
import FormPanel from "../../../../component/FormPanel";
import {
  removebtn,
  btn,
  input,
  label,
  select,
} from "../../../../utils/tailwindClasses";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";

function AddKV33ConsumerFeederData() {
  // State to manage rows
  const [rows, setRows] = useState([
    { actionName: "", zone: "", circle: "", division: "", interfacePoints: "" },
  ]);

  // Function to handle adding a new row
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        actionName: "",
        zone: "",
        circle: "",
        division: "",
        interfacePoints: "",
      },
    ]);
  };

  // Function to handle input changes in each row
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  // Function to handle removing a row
  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  return (
    <>
      <Header
        title="Add 33KV & Above Consumer Feeder Master Data"
        action={{
          button: "33KV & Above Consumer List",
          path: "/kv33ConsumerFeederMaster",
        }}
      />
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Division</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>33KV & Above Consumer Feeder Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Independent Feeder Voltage</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
              <option>220</option>
              <option>132</option>
              <option>33</option>
              <option>11</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Category Of Feeder </label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
              <option>INDEPENDENT</option>
              <option>TAPPED(WITH OTHER CONSUMER FEEDER)</option>
              <option>TAPPED(WITH DISTRIBUTION SUBSTATION FEEDER)</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Project Area </label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
              <option>IPDS</option>
              <option>RURAL</option>
              <option>URBAN</option>
              <option>TEHSIL</option>
              <option>DISTRICT HQ</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Supply Area</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
              <option>TEHSIL HQ</option>
              <option>DISTRICT HQ</option>
              <option>OTHERS</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Independent Feeder Code</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Meter (Make & Type)</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Meter (SL.No)</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Overall MF</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Customer Account ID</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Length of Feeder (in KM)</label>
          </div>
        </div>
      </FormPanel>
      <div className="overflow-x-auto mt-4">
        <Table className="min-w-full">
          <Thead>
            <Tr>
              <Th>Action Name</Th>
              <Th>Zone (Transmission)</Th>
              <Th>Circle (Transmission)</Th>
              <Th>Division (Transmission)</Th>
              <Th>T-D Interface Points (Bay)</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <input
                    className={`${input} w-full`}
                    name="actionName"
                    value={row.actionName}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Td>
                <Td>
                  <input
                    className={`${input} w-full`}
                    name="zone"
                    value={row.zone}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Td>
                <Td>
                  <input
                    className={`${input} w-full`}
                    name="circle"
                    value={row.circle}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Td>
                <Td>
                  <input
                    className={`${input} w-full`}
                    name="division"
                    value={row.division}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Td>
                <Td>
                  <input
                    className={`${input} w-full`}
                    name="interfacePoints"
                    value={row.interfacePoints}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Td>
                <Td>
                  {index === 0 ? (
                    <button className={btn} onClick={handleAddRow}>
                      Add
                    </button>
                  ) : (
                    <button
                      className={`${removebtn} bg-red-500`}
                      onClick={() => handleRemoveRow(index)}
                    >
                      Remove
                    </button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <div className="col-span-3 justify-between space-x-4">
        <button className={btn + " w-1/5"}>Submit</button>
        <button className={removebtn + " bg-red-500 w-1/5"}>Reset</button>
      </div>
    </>
  );
}

export default AddKV33ConsumerFeederData;
