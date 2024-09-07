import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import FormPanel from "../../../../component/FormPanel";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import Header from "../../../../component/Header";
import Loader from "../../../../component/Loader";
import { apiUrl } from "../../../../utils/constant";
import { CiCircleList } from "react-icons/ci";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import {
  label,
  select,
  btn,
  input,
  removebtn,
} from "../../../../utils/tailwindClasses";

function AddOutgoingFeederMasterData() {
  const [localBodyData, setLocalBodyData] = useState({
    id: "",
    divisionName: "",
    substationName: "",
    feederName: "",
  });

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      feederVoltage: "",
      outgoingFeederName: "",
      categoryOfFeeder: "",
      projectArea: "",
      supplyArea: "",
      feederCode: "",
      meterMakeType: "",
      meterSerialNo: "",
      noOfConsumers: "",
      overallMF: "",
      isAddButton: true,
    },
  ]);

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const { token } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const division = queryParams.get("division") || "";
    const subStation = queryParams.get("subStation") || "";
    const feederName = queryParams.get("feederName") || "";

    // Set the state with extracted values
    setLocalBodyData({
      divisionName: division,
      substationName: subStation,
      feederName: feederName,
    });
  }, [location.search]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: Date.now(),
        feederVoltage: "",
        outgoingFeederName: "",
        categoryOfFeeder: "",
        projectArea: "",
        supplyArea: "",
        feederCode: "",
        meterMakeType: "",
        meterSerialNo: "",
        noOfConsumers: "",
        overallMF: "",
        isAddButton: false,
      },
    ]);
  };

  const validateRows = () => {
    for (let row of rows) {
      if (
        !row.feederVoltage ||
        !row.outgoingFeederName ||
        !row.categoryOfFeeder ||
        !row.projectArea ||
        !row.supplyArea ||
        !row.feederCode ||
        !row.meterMakeType ||
        !row.meterSerialNo ||
        !row.noOfConsumers ||
        !row.overallMF
      ) {
        return false;
      }
    }
    return true;
  };

  const saveOutgoingFeeder = async () => {
    if (!validateRows()) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all required fields in the table before submitting.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setLoading(true);
    const data = {
      ...localBodyData,
      feederDetails: rows,
    };
    try {
      const response = await axios.post(
        `${apiUrl}distribution/add-outgoing-feeder`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Outgoing Feeder Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/outgoingFeederMaterData");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error saving feeder data.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRowChange = (id, e) => {
    const { name, value } = e.target;
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  const resetForm = () => {
    setLocalBodyData({
      divisionName: "",
      substationName: "",
      feederName: "",
    });
    setRows([
      {
        id: Date.now(),
        feederVoltage: "",
        outgoingFeederName: "",
        categoryOfFeeder: "",
        projectArea: "",
        supplyArea: "",
        feederCode: "",
        meterMakeType: "",
        meterSerialNo: "",
        noOfConsumers: "",
        overallMF: "",
        isAddButton: true,
      },
    ]);
  };

  return (
    <>
      <Header
        title="Add Distribution Outgoing Feeder Details"
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
              Outgoing Feeder List
            </div>
          ),
          path: "/outgoingFeederMaterData",
        }}
      />

      {loading && <Loader />}

      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <input
              className={input}
              name="divisionName"
              readOnly
              value={localBodyData.divisionName}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label className={label}>Division</label>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              className={input}
              value={localBodyData.substationName}
              readOnly
              onChange={handleInputChange}
              name="substationName"
              placeholder=" "
            />
            <label className={label}>Distribution Sub-Station Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              className={input}
              name="feederName"
              readOnly
              value={localBodyData.feederName}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label className={label}>Feeder Name</label>
          </div>
        </div>
        <div className="col-span-3">
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
                    <input
                      className={input}
                      name="feederVoltage"
                      value={row.feederVoltage}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="outgoingFeederName"
                      value={row.outgoingFeederName}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="categoryOfFeeder"
                      value={row.categoryOfFeeder}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="projectArea"
                      value={row.projectArea}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="supplyArea"
                      value={row.supplyArea}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="feederCode"
                      value={row.feederCode}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="meterMakeType"
                      value={row.meterMakeType}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="meterSerialNo"
                      value={row.meterSerialNo}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="noOfConsumers"
                      value={row.noOfConsumers}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    <input
                      className={input}
                      name="overallMF"
                      value={row.overallMF}
                      onChange={(e) => handleRowChange(row.id, e)}
                      placeholder=" "
                    />
                  </Td>
                  <Td>
                    {index === 0 ? (
                      <button className={btn} onClick={handleAddRow}>
                        <IoAddCircleSharp />
                      </button>
                    ) : (
                      <button
                        className={`${removebtn} bg-red-500`}
                        onClick={() => handleRemoveRow(row.id)}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </FormPanel>
      <div className="col-span-3 justify-between space-x-4">
        <button className={btn} onClick={saveOutgoingFeeder}>
          Submit
        </button>
        <button className={`${removebtn} bg-red-500`} onClick={resetForm}>
          Reset
        </button>
      </div>
    </>
  );
}

export default AddOutgoingFeederMasterData;
