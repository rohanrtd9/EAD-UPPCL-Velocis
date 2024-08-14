import React, { useState } from "react";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import {
  btn,
  input,
  label,
  removebtn,
  select,
} from "../../../../utils/tailwindClasses";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

function AddFeederBayData() {
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      energyMeter: "",
      mf: "",
      openingReadingImport: "",
      openingReadingExport: "",
      month: "",
      year: "",
      isAbandon: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        energyMeter: "",
        mf: "",
        openingReadingImport: "",
        openingReadingExport: "",
        month: "",
        year: "",
        isAbandon: "",
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  return (
    <>
      <Header
        title="Add SubStation"
        action={{
          button: "Feeder/Bay-Wise List",
          path: "/FeederBayDataList",
        }}
      />
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Zone (Transmission)</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Circle (Transmission)</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Division (Transmission)</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Name Of Substation</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Voltage Level Of Feeder/Bay</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Name Of Feeder/Bay Of Substation</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Interface Type</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Transaction Type</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Discom (Transmission)</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 flex justify-between">
          <button className={btn + " w-1/5"}>Submit</button>
        </div>
      </FormPanel>

      <Table>
        <Thead>
          <Tr>
            <Th>Energy Meter Serial No</Th>
            <Th>MF(MWh)</Th>
            <Th>Opening Reading(Import)</Th>
            <Th>Opening Reading(Export)</Th>
            <Th>Month</Th>
            <Th>Year</Th>
            <Th>Is Abandon</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={row.id}>
              <Td>
                <input
                  className={input}
                  placeholder=" "
                  value={row.energyMeter}
                  onChange={(e) =>
                    handleInputChange(row.id, "energyMeter", e.target.value)
                  }
                />
              </Td>
              <Td>
                <input
                  className={input}
                  placeholder=" "
                  value={row.mf}
                  onChange={(e) =>
                    handleInputChange(row.id, "mf", e.target.value)
                  }
                />
              </Td>
              <Td>
                <input
                  className={input}
                  placeholder=" "
                  value={row.openingReadingImport}
                  onChange={(e) =>
                    handleInputChange(
                      row.id,
                      "openingReadingImport",
                      e.target.value
                    )
                  }
                />
              </Td>
              <Td>
                <input
                  className={input}
                  placeholder=" "
                  value={row.openingReadingExport}
                  onChange={(e) =>
                    handleInputChange(
                      row.id,
                      "openingReadingExport",
                      e.target.value
                    )
                  }
                />
              </Td>
              <Td>
                <input
                  className={input}
                  placeholder=" "
                  value={row.month}
                  onChange={(e) =>
                    handleInputChange(row.id, "month", e.target.value)
                  }
                />
              </Td>
              <Td>
                <input
                  className={input}
                  placeholder=" "
                  value={row.year}
                  onChange={(e) =>
                    handleInputChange(row.id, "year", e.target.value)
                  }
                />
              </Td>
              <Td>
                <input
                  className={input}
                  placeholder=" "
                  value={row.isAbandon}
                  onChange={(e) =>
                    handleInputChange(row.id, "isAbandon", e.target.value)
                  }
                />
              </Td>
              <Td flex={true}>
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
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default AddFeederBayData;
