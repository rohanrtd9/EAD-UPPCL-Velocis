import React, { useState } from "react";
import Header from "../../../../component/Header";
import FormPanel from "../../../../component/FormPanel";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import {
  removebtn,
  btn,
  input,
  label,
  select,
} from "../../../../utils/tailwindClasses";

function Add33KVStatusByAdmin() {
  // State for form inputs
  const [formData, setFormData] = useState({
    division: "",
    feederName: "",
    monthOfEntry: "",
    yearOfEntry: "",
    remarks: "",
    receiptEnergy: "",
    discom: "DAKSHINANCHAL",
    zone: "KANPUR-1",
    circle: "EDC-KANPUR",
    edDivision: "EDD I KANPUR",
    month: "AUGUST",
    year: "2024",
    consumerData: [
      {
        id: 1,
        feederName: "",
        feederCategory: "",
        projectArea: "",
        supplyArea: "",
        feederCode: "",
        makeType: "",
        serialNumber: "",
        customerAccountId: "",
        previousReading: "",
        presentReading: "",
        readingDiff: "",
        overallMF: "",
        energyConsumption: "",
        energyAssessed: "",
        totalEnergyConsumption: "",
        defectReason: "",
        defectDate: "",
      },
    ],
  });

  const label1 = "block text-gray-700 text-sm font-bold mb-2";

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for consumer data changes
  const handleConsumerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedConsumerData = formData.consumerData.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData((prev) => ({
      ...prev,
      consumerData: updatedConsumerData,
    }));
  };

  // Handler to add new consumer row
  const addConsumerRow = () => {
    setFormData((prev) => ({
      ...prev,
      consumerData: [
        ...prev.consumerData,
        {
          id: prev.consumerData.length + 1,
          feederName: "",
          feederCategory: "",
          projectArea: "",
          supplyArea: "",
          feederCode: "",
          makeType: "",
          serialNumber: "",
          customerAccountId: "",
          previousReading: "",
          presentReading: "",
          readingDiff: "",
          overallMF: "",
          energyConsumption: "",
          energyAssessed: "",
          totalEnergyConsumption: "",
          defectReason: "",
          defectDate: "",
        },
      ],
    }));
  };

  // Handler to remove consumer row
  const removeConsumerRow = (index) => {
    const updatedConsumerData = formData.consumerData.filter(
      (item, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      consumerData: updatedConsumerData,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Perform form validation and API calls here
  };

  return (
    <>
      <Header
        title="Add 33KV & Above Consumer Feeder Metering Status By Admin"
        action={{
          button: "",
          path: "",
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
            <label className={label}>Month Of Entry</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year Of Entry</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 justify-between space-x-4">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={removebtn + " bg-red-500 w-1/5"}>Reset</button>
        </div>
      </FormPanel>

      {/* First Table */}
      <Table className="mt-2">
        <Thead>
          <Tr>
            <Th>Zone (Transmission)</Th>
            <Th>Circle (Transmission)</Th>
            <Th>Division (Transmission)</Th>
            <Th>Sub-Station (Transmission)</Th>
            <Th>T-D Interface Points (Bay)</Th>
            <Th>Volatege Lavel</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>South-West</Td>
            <Td>ETC Kanpur -1</Td>
            <Td>220 kV Div. Panki, Kanpur</Td>
            <Td>220 KV S/S Panki, Kanpur</Td>
            <Td>PSIT</Td>
            <Td>33</Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Th>Receipt Energy (MWH)</Th>
            <Td>
              <input className={input} placeholder=" " />
            </Td>
          </Tr>
          <Tr>
            <Th>DISCOM</Th>
            <Td>DAKSHINANCHAL</Td>
            <Th>ZONE</Th>
            <Td>KANPUR-1</Td>
            <Th>CIRCLE</Th>
            <Td>EDC-KANPUR</Td>
          </Tr>
          <Tr>
            <Th>DIVISION</Th>
            <Td>EDD I KANPUR</Td>
            <Th>MONTH</Th>
            <Td>AUGUST</Td>
            <Th>YEAR</Th>
            <Td>2024</Td>
          </Tr>
        </Tbody>
      </Table>

      {/* <Table className="mt-2">
        <Thead>
          <Tr>
            <Th rowSpan={2}>Sr.No</Th>
            <Th rowSpan={2}>Name</Th>
            <Th rowSpan={2}>Number</Th>
            <Th colSpan={2}>
              <span style={{ textAlign: "center" }}>Email</span>
            </Th>
            <Th rowSpan={2}>Address</Th>
          </Tr>
          <Tr>
            <Th>Mobile</Th>
            <Th>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>John Doe</Td>
            <Td>123-456-7890</Td>
            <Td>098-765-4321</Td>
            <Td>john.doe@example.com</Td>
            <Td>123 Main St, City</Td>
          </Tr>
        </Tbody>
      </Table> */}

      {/* Consumer Data Table */}
      <Table className="mt-6">
        <Thead>
          <Tr>
            <Th rowSpan={2}>Sr.No</Th>
            <Th rowSpan={2}>33 KV Above Consumer Feeder Name</Th>
            <Th rowSpan={2}>Category Of Feeder</Th>
            <Th rowSpan={2}>Project Area</Th>
            <Th rowSpan={2}>Supply Area</Th>
            <Th rowSpan={2}>Feeder Code</Th>
            <Th colSpan={2}>Meter Details</Th>
            <Th rowSpan={2}>Customer Account ID</Th>
            <Th colSpan={3}>Meter Reading</Th>
            <Th rowSpan={2}>Overall MF</Th>
            <Th rowSpan={2}>Energy Consumption (MWh)</Th>
            <Th rowSpan={2}>Energy Assessed (MWh)</Th>
            <Th rowSpan={2}>Total Energy Consumption (MWh)</Th>
            <Th rowSpan={2}>Reason of Defect/Not Recording</Th>
            <Th rowSpan={2}>Date Of Defect</Th>
            <Th rowSpan={2}>Actions</Th>
          </Tr>
          <Tr>
            <Th>Make & Type</Th>
            <Th>SL.No.</Th>
            <Th>Previous</Th>
            <Th>Present</Th>
            <Th>Diff.(11-10)</Th>
          </Tr>
          <Tr>
            <Th>1</Th>
            <Th>2</Th>
            <Th>3</Th>
            <Th>4</Th>
            <Th>5</Th>
            <Th>6</Th>
            <Th>7</Th>
            <Th>8</Th>
            <Th>9</Th>
            <Th>10</Th>
            <Th>11</Th>
            <Th>12</Th>
            <Th>13</Th>
            <Th>14</Th>
            <Th>15</Th>
            <Th>16</Th>
            <Th>17</Th>
            <Th>18</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {formData.consumerData.map((consumer, index) => (
            <Tr key={consumer.id}>
              <Td>{consumer.id}</Td>
              <Td>
                <input
                  type="text"
                  name="feederName"
                  className={input}
                  value={consumer.feederName}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Feeder Name"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="feederCategory"
                  className={input}
                  value={consumer.feederCategory}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Feeder Category"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="projectArea"
                  className={input}
                  value={consumer.projectArea}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Project Area"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="supplyArea"
                  className={input}
                  value={consumer.supplyArea}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Supply Area"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="feederCode"
                  className={input}
                  value={consumer.feederCode}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Feeder Code"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="makeType"
                  className={input}
                  value={consumer.makeType}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Make & Type"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="serialNumber"
                  className={input}
                  value={consumer.serialNumber}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Serial Number"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="customerAccountId"
                  className={input}
                  value={consumer.customerAccountId}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Customer Account ID"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name="previousReading"
                  className={input}
                  value={consumer.previousReading}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Previous Reading"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name="presentReading"
                  className={input}
                  value={consumer.presentReading}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Present Reading"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name="readingDiff"
                  className={input}
                  value={
                    consumer.presentReading && consumer.previousReading
                      ? consumer.presentReading - consumer.previousReading
                      : ""
                  }
                  readOnly
                  placeholder="Reading Difference"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name="overallMF"
                  className={input}
                  value={consumer.overallMF}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Overall MF"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name="energyConsumption"
                  className={input}
                  value={
                    consumer.readingDiff && consumer.overallMF
                      ? consumer.readingDiff * consumer.overallMF
                      : ""
                  }
                  readOnly
                  placeholder="Energy Consumption"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name="energyAssessed"
                  className={input}
                  value={consumer.energyAssessed}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Energy Assessed"
                />
              </Td>
              <Td>
                <input
                  type="number"
                  name="totalEnergyConsumption"
                  className={input}
                  value={
                    consumer.energyConsumption && consumer.energyAssessed
                      ? consumer.energyConsumption + consumer.energyAssessed
                      : ""
                  }
                  readOnly
                  placeholder="Total Energy Consumption"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  name="defectReason"
                  className={input}
                  value={consumer.defectReason}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Reason of Defect"
                />
              </Td>
              <Td>
                <input
                  type="date"
                  name="defectDate"
                  className={input}
                  value={consumer.defectDate}
                  onChange={(e) => handleConsumerChange(index, e)}
                  placeholder="Date of Defect"
                />
              </Td>
              <Td>
                <button
                  type="button"
                  className={removebtn + " bg-red-500"}
                  onClick={() => removeConsumerRow(index)}
                >
                  Remove
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add Consumer Row Button */}
      <div className="flex justify-end mt-4">
        <button type="button" className={btn} onClick={addConsumerRow}>
          Add
        </button>
      </div>

      <div className="">
        <span style={{ color: "red" }}>
          Note : 1- Meter Changed, 2- CT Defective, 3- PT Defective, 4-Meter
          Defective, 5- Others
        </span>
      </div>

      {/* Remarks Section */}
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label1}>Remarks</label>
            <textarea
              className="form-textarea"
              placeholder=""
              cols={80}
              rows={5}
            ></textarea>
          </div>
        </div>

        <div className="col-span-3 justify-between space-x-4">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={removebtn + " bg-red-500 w-1/5"}>Reset</button>
        </div>
      </FormPanel>
    </>
  );
}

export default Add33KVStatusByAdmin;
