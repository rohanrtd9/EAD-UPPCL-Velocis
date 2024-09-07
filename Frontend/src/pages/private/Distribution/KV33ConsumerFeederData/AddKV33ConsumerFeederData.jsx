import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { CiCircleList } from "react-icons/ci";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Loader from "../../../../component/Loader";
import { useUserContext } from "../../../../utils/userContext";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";

import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";

function AddKV33ConsumerFeederData() {
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { pageName } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();
  const [localBodyData, setLocalBodyData] = useState({
    divisionName: "",
    consumerName: "",
    feederVoltage: "",
    feederCategory: "",
    projectArea: "",
    supplyArea: "",
    feederCode: "",
    meterMake: "",
    meterSLNo: "",
    overallMF: "",
    consumerID: "",
    lengthOfFeeder: "",
  });
  const [rows, setRows] = useState([
    {
      id: 1,
      district: "",
      subStationName: "",
      zone: "",
      circle: "",
      division: "",
      tdInterfacePoint: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await listDivision();
      await listDistrict();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pageName !== "AddKV33ConsumerFeederData") {
      try {
        const data = JSON.parse(pageName);
        const updatedData = data?.transmissionsDetails.map((item, index) => {
          return {
            ...item,
            id: index + 1,
          };
        });
        setRows(updatedData);
        setIsEdit(true);
        setLocalBodyData({
          id: data._id,
          divisionName: data.divisionName,
          consumerName: data.consumerName,
          feederVoltage: data.feederVoltage,
          feederCategory: data.feederCategory,
          projectArea: data.projectArea,
          supplyArea: data.supplyArea,
          feederCode: data.feederCode,
          meterMake: data.meterMake,
          meterSLNo: data.meterSLNo,
          overallMF: data.overallMF,
          consumerID: data.consumerID,
          lengthOfFeeder: data.lengthOfFeeder,
        });
      } catch (error) {
        console.error("Error parsing pageName:", error);
      }
    } else {
      setIsEdit(false);
    }
  }, [pageName]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      district: "",
      subStationName: "",
      zone: "",
      circle: "",
      division: "",
      tdInterfacePoint: "",
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };
  const handleChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const newRow = { ...row, [field]: value };
        return newRow;
      }
      return row;
    });
    setRows(updatedRows);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setLocalBodyData({
      divisionName: "",
      consumerName: "",
      feederVoltage: "",
      feederCategory: "",
      projectArea: "",
      supplyArea: "",
      feederCode: "",
      meterMake: "",
      meterSLNo: "",
      overallMF: "",
      consumerID: "",
      lengthOfFeeder: "",
      district: "",
      subStationName: "",
      zone: "",
      circle: "",
      division: "",
      tdInterfacePoint: "",
    });
    setRows([{ id: Date.now() }]);
    setIsEdit(false);
  };

  const save33KVMaster = async () => {
    setLoading(true);
    const data = {
      divisionName: localBodyData?.divisionName || "",
      consumerName: localBodyData?.consumerName || "",
      feederVoltage: localBodyData?.feederVoltage || "",
      feederCategory: localBodyData?.feederCategory || "",
      projectArea: localBodyData?.projectArea || "",
      supplyArea: localBodyData?.supplyArea || "",
      feederCode: localBodyData?.feederCode || "",
      meterMake: localBodyData?.meterMake || "",
      meterSLNo: localBodyData?.meterSLNo || "",
      overallMF: localBodyData?.overallMF || "",
      consumerID: localBodyData?.consumerID || "",
      lengthOfFeeder: localBodyData?.lengthOfFeeder || "",
      transmissionsDetails: rows || [],
    };

    try {
      const response = await axios.post(
        `${apiUrl}/add-33KVIndependent-feeder`,
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
        text: "Substation Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/kv33ConsumerFeederMaster");
      });

      resetForm();
    } catch (error) {
      console.error("Error saving substation:", error);

      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Error saving substation.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const listDivision = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-division`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDivision(response.data.result.docs || []);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    } finally {
      setLoading(false);
    }
  };

  const listDistrict = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-districts`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDistrict(response.data.result.docs || []);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };

  const update33KVMaster = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      divisionName: localBodyData.divisionName,
      consumerName: localBodyData.consumerName,
      feederVoltage: localBodyData.feederVoltage,
      feederCategory: localBodyData.feederCategory,
      projectArea: localBodyData.projectArea,
      supplyArea: localBodyData.supplyArea,
      feederCode: localBodyData.feederCode,
      meterMake: localBodyData.meterMake,
      meterSLNo: localBodyData.meterSLNo,
      overallMF: localBodyData.overallMF,
      consumerID: localBodyData.consumerID,
      lengthOfFeeder: localBodyData.lengthOfFeeder,
      transmissionsDetails: rows,
    };

    try {
      const response = await axios.put(
        `${apiUrl}/edit-33KVIndependent-feeder`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        text: "Record updated successfully.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/kv33ConsumerFeederMaster");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        text: error.response?.data?.message || "Error updating circle.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
      });
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Add 33KV & Above Consumer Feeder Data"
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
              33KV & Above Consumer List
            </div>
          ),
          path: "/kv33ConsumerFeederMaster",
        }}
      />
      <FormPanel>
        {/* Division */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Division
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="divisionName"
              className={select}
              value={localBodyData.divisionName}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {division.map((div) => (
                <option key={div._id} value={div.divisionName}>
                  {div.divisionName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Substation Name */}

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="consumerName"
              value={localBodyData.consumerName}
              className={input}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label className={label}>
              33KV & Above Consumer Feeder Name
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Independent Feeder Voltage
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              value={localBodyData.feederVoltage}
              name="feederVoltage"
              className={select}
              defaultValue=""
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="220">220</option>
              <option value="132">132</option>
              <option value="33">33</option>
              <option value="11">11</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Category Of Feeder
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>{" "}
            </label>
            <select
              value={localBodyData.feederCategory}
              name="feederCategory"
              className={select}
              defaultValue=""
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="INDEPENDENT">INDEPENDENT</option>
              <option value="TAPPED(WITH OTHER CONSUMER FEEDER)">
                TAPPED(WITH OTHER CONSUMER FEEDER)
              </option>
              <option value="TAPPED(WITH DISTRIBUTION SUBSTATION FEEDER)">
                TAPPED(WITH DISTRIBUTION SUBSTATION FEEDER)
              </option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Project Area
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>{" "}
            </label>
            <select
              value={localBodyData.projectArea}
              name="projectArea"
              className={select}
              defaultValue=""
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="IPDS">IPDS</option>
              <option value="RURAL">RURAL</option>
              <option value="URBAN">URBAN</option>
              <option value="TEHSIL">TEHSIL</option>
              <option value="DISTRICT HQ">DISTRICT HQ</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Supply Area
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              value={localBodyData.supplyArea}
              name="supplyArea"
              className={select}
              defaultValue=""
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="TEHSIL HQ">TEHSIL HQ</option>
              <option value="DISTRICT HQ">DISTRICT HQ</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              value={localBodyData.feederCode}
              name="feederCode"
              className={input}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label className={label}>
              Independent Feeder Code
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              value={localBodyData.meterMake}
              name="meterMake"
              className={input}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label className={label}>
              Meter (Make & Type)
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              value={localBodyData.meterSLNo}
              name="meterSLNo"
              className={input}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label className={label}>
              Meter (SL.No)
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              value={localBodyData.overallMF}
              name="overallMF"
              className={input}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label className={label}>
              Overall MF
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              value={localBodyData.consumerID}
              name="consumerID"
              className={input}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label className={label}>
              Customer Account ID
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              value={localBodyData.lengthOfFeeder}
              name="lengthOfFeeder"
              className={input}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label className={label}>
              Length of Feeder (in KM)
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        {/* Add/Remove Rows */}
        <div className="col-span-full overflow-x-auto">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="flex gap-4 mb-4 p-4  border-gray-300 rounded-lg"
            >
              {/* District */}
              <div className="col-span-1">
                <div className="relative z-0 w-full group">
                  <label className={label}>
                    District
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={select}
                    value={row.district}
                    onChange={(e) =>
                      handleChange(row.id, "district", e.target.value)
                    }
                  >
                    <option value="">--Select--</option>
                    {district.map((d) => (
                      <option key={d._id} value={d.districtName}>
                        {d.districtName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Zone */}
              <div className="col-span-1">
                <div className="relative z-0 w-full group">
                  <input
                    className={input}
                    value={row.zone}
                    autoComplete="off"
                    onChange={(e) =>
                      handleChange(row.id, "zone", e.target.value)
                    }
                  />
                  <label className={label}>
                    Zone(Transmission)
                    <span
                      className="text-red-500"
                      style={{ fontSize: "1.30rem" }}
                    >
                      *
                    </span>
                  </label>
                </div>
              </div>

              {/* Circle */}
              <div className="col-span-1">
                <div className="relative z-0 w-full group">
                  <input
                    className={input}
                    autoComplete="off"
                    value={row.circle}
                    onChange={(e) =>
                      handleChange(row.id, "circle", e.target.value)
                    }
                  />
                  <label className={label}>
                    Circle(Transmission)
                    <span
                      className="text-red-500"
                      style={{ fontSize: "1.30rem" }}
                    >
                      *
                    </span>
                  </label>
                </div>
              </div>

              {/* Division */}
              <div className="col-span-1">
                <div className="relative z-0 w-full group">
                  <input
                    className={input}
                    autoComplete="off"
                    value={row.division}
                    onChange={(e) =>
                      handleChange(row.id, "division", e.target.value)
                    }
                  />
                  <label className={label}>
                    Division(Transmission)
                    <span
                      className="text-red-500"
                      style={{ fontSize: "1.30rem" }}
                    >
                      *
                    </span>
                  </label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative z-0 w-full group">
                  <label className={label}>
                    TD Interface
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={select}
                    value={row.tdInterfacePoint}
                    onChange={(e) =>
                      handleChange(row.id, "tdInterfacePoint", e.target.value)
                    }
                    defaultValue=""
                  >
                    <option>--Select--</option>
                    <option value="40 MVA T/F ||">40 MVA T/F ||</option>
                    <option value="40 MVA T/F">40 MVA T/F</option>
                    <option value="33 KV SOHNI">33 KV SOHNI</option>
                    <option value="40 MVA T/F ||">33 KV BIDHUNA</option>
                  </select>
                </div>
              </div>

              {/* Add/Remove Buttons */}

              <div className="col-span-1 flex items-end">
                {index === 0 ? (
                  <button
                    type="button"
                    className={`${btn} bg-green-500 hover:bg-green-600`}
                    onClick={handleAddRow}
                  >
                    <IoAddCircleSharp />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`${removebtn} bg-red-500`}
                    onClick={() => handleRemoveRow(row.id)}
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-3 justify-between space-x-4">
          <button
            className={btn}
            onClick={isEdit ? update33KVMaster : save33KVMaster}
            disabled={loading}
          >
            {loading ? "Loading..." : isEdit ? "Update" : "Submit"}
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </FormPanel>
    </>
  );
}

export default AddKV33ConsumerFeederData;
