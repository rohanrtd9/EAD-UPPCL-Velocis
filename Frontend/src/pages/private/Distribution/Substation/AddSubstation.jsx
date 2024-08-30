import React, { useState } from "react";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { CiCircleList } from "react-icons/ci";

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
          button: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              <CiCircleList
                style={{
                  fontSize: "18px",
                  color: "#DCDCDC",
                  marginRight: "8px",
                }}
              />
              Substations List
            </div>
          ),
          path: "/substations",
        }}
      />
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Division
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>

            <select className={select} defaultValue="">
              <option>Select Division</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>
              Distribution Sub-Station Name{" "}
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>
              Distribution Sub-Station Code{" "}
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Voltage level of Distribution Substation (KV)
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
              <option>33</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " required />
            <label className={label}>
              Junior Engineer Name
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>
              Junior Engineer Number
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Start Month
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Year
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
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
                    <option>--Select--</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </td>
                <td className="p-1">
                  <input className={input} placeholder="Substation Name" />
                </td>
                <td className="p-1">
                  <input className={input} placeholder="Zone(Transmission)" />
                </td>
                <td className="p-1">
                  <input className={input} placeholder="Circle(Transmission)" />
                </td>

                <td className="p-1">
                  <input
                    className={input}
                    placeholder="Division(Transmission)"
                  />
                </td>
                <td className="p-1 d-flex align-items-center">
                  <select className={select} defaultValue="">
                    <option>--Select--</option>
                    <option value="40 MVA T/F ||">40 MVA T/F ||</option>
                    <option value="40 MVA T/F">40 MVA T/F</option>
                    <option value="33 KV SOHNI">33 KV SOHNI</option>
                    <option value="40 MVA T/F ||">33 KV BIDHUNA</option>
                  </select>
                </td>
                <td className="p-1">
                  {index === 0 ? (
                    <button
                      className={`${btn} no-underline`}
                      onClick={handleAddRow}
                    >
                      <IoAddCircleSharp className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      className={`${removebtn} bg-red-500 no-underline `}
                      onClick={() => handleRemoveRow(row.id)}
                    >
                      <FaMinus className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-span-3 flex justify-between space-x-4 mt-4">
          <button className={`${btn} no-underline w-1/5 mt-2 mb-2`}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default AddSubstation;
