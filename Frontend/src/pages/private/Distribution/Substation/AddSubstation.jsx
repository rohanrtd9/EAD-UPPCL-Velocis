import React, { useState } from "react";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";

function AddSubstation() {
  const [rows, setRows] = useState([{ id: Date.now() }]);

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now() }]);
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <>
      <Header
        title="Add Substation"
        action={{
          button: "Substations List",
          path: "/substations",
        }}
      />
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Division Name</label>
            <select className={select} defaultValue="">
              <option>Select Division</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Voltage level of Distribution Substation (KV)
            </label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Month</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
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
            <label className={label}>Distribution Sub-Station Code</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Junior Engineer Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Junior Engineer Number</label>
          </div>
        </div>
      </FormPanel>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-1">S.No.</th>
              <th className="p-1">District</th>
              <th className="p-1">Transmission Sub-Station Name</th>
              <th className="p-1">Zone(Transmission)</th>
              <th className="p-1">Circle(Transmission)</th>
              <th className="p-1">Division(Transmission)</th>
              <th className="p-1">T-D Interface points(Bay)</th>
              <th className="p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-1">{index + 1}</td>
                <td className="p-1">
                  <select className={select} defaultValue="">
                    <option>District</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </td>
                <td className="p-1">
                  <input className={input} placeholder="" />
                  <label className={label}>Distribution Sub-Station Name</label>
                </td>
                <td className="p-1">
                  <input className={input} placeholder="" />
                  <label className={label}>Distribution</label>
                </td>
                <td className="p-1">
                  <input className={input} placeholder="" />
                  <label className={label}>Distribution</label>
                </td>

                <td className="p-1">
                  <input className={input} placeholder="Distribution" />
                  <label className={label}>Distribution</label>
                </td>
                <td className="p-1">
                  <input className={input} placeholder="" />
                  <label className={label}>Distribution</label>
                </td>
                <td className="p-1">
                  {index === 0 ? (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-span-3 justify-between space-x-4">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={removebtn + " bg-red-500 w-1/5"}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default AddSubstation;
