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
import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";

function AddSubstation() {
  const [division, setDivision] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [district, setDistrict] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    divisionName: "",
    substationName: "",
    subStationCode: "",
    capacityUnitSubStation: "",
    jeeName: "",
    jeeNumber: "",
    startMonth: "",
    startYear: "",
  });
  const [rows, setRows] = useState([
    {
      id: 1,
      district: "",
      subStationName: "",
      zone: "",
      circle: "",
      division: "",
      tdInterface: "",
    },
  ]);
  const { pageName } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();

  // Fetch divisions, months, and years when the component mounts
  useEffect(() => {
    listDivision();
    listMonth();
    listYear();
    listDistrict();
  }, []);

  useEffect(() => {
    if (pageName !== "AddSubstation") {
      try {
        const data = JSON.parse(pageName);
        console.log(data);
        const updatedData = data?.transmissionDetail.map((item, index) => {
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
          substationName: data.substationName,
          subStationCode: data.subStationCode,
          capacityUnitSubStation: data.capacityUnitSubStation,
          jeeName: data.jeeName,
          jeeNumber: data.jeeNumber,
          startMonth: data.startMonth,
          startYear: data.startYear,
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
      tdInterface: "",
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
      substationName: "",
      subStationCode: "",
      capacityUnitSubStation: "",
      jeeName: "",
      jeeNumber: "",
      startMonth: "",
      startYear: "",
      district: "",
      subStationName: "",
      zone: "",
      circle: "",
      division: "",
      tdInterface: "",
    });
    setRows([{ id: Date.now() }]);
    setIsEdit(false);
  };

  const saveSubstationMaster = async () => {
    setLoading(true);
    const data = {
      ...localBodyData,
      transmissionDetail: rows,
    };
    try {
      const response = await axios.post(
        `${apiUrl}distribution/add-substation`,
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
        navigate("/substations");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error saving substation.",
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
        `${apiUrl}distribution/list-division`,
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
        `${apiUrl}distribution/list-districts`,
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

  const listMonth = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/monthList`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMonth(response.data.result.docs || []);
    } catch (error) {
      console.error("Error fetching months:", error);
    } finally {
      setLoading(false);
    }
  };

  const listYear = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/yearList`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setYear(response.data.result.docs || []);
    } catch (error) {
      console.error("Error fetching years:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubstationMaster = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      divisionName: localBodyData.divisionName,
      substationName: localBodyData.substationName,
      subStationCode: localBodyData.subStationCode,
      capacityUnitSubStation: localBodyData.capacityUnitSubStation,
      jeeName: localBodyData.jeeName,
      jeeNumber: localBodyData.jeeNumber,
      startMonth: localBodyData.startMonth,
      startYear: localBodyData.startYear,
      transmissionDetail: rows,
    };

    try {
      const response = await axios.put(
        `${apiUrl}distribution/edit-substation`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response);
      Swal.fire({
        text: "Record updated successfully.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/substations");
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
  //console.log("result", rows);
  return (
    <>
      <Header
        title={isEdit ? "Update Substation" : "Add Substation"}
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
              name="substationName"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.substationName}
              onChange={handleInputChange}
            />
            <label className={label}>
              Distribution Sub-Station Name
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        {/* Substation Code */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="subStationCode"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.subStationCode}
              onChange={handleInputChange}
            />
            <label className={label}>
              Distribution Sub-Station Code
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        {/* Voltage Level */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Voltage level of Distribution Substation (KV)
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="capacityUnitSubStation"
              className={select}
              value={localBodyData.capacityUnitSubStation}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="33">33</option>
            </select>
          </div>
        </div>

        {/* Junior Engineer Name */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="jeeName"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.jeeName}
              onChange={handleInputChange}
            />
            <label className={label}>
              Junior Engineer Name
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        {/* Junior Engineer Number */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="jeeNumber"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.jeeNumber}
              onChange={handleInputChange}
            />
            <label className={label}>
              Junior Engineer Number
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        {/* Start Month */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Start Month
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="startMonth"
              className={select}
              value={localBodyData.startMonth}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {month.map((m) => (
                <option key={m._id} value={m.startMonth}>
                  {m.monthName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Start Year */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Start Year
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="startYear"
              className={select}
              value={localBodyData.startYear}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {year.map((y) => (
                <option key={y._id} value={y.startYear}>
                  {y.yearName}
                </option>
              ))}
            </select>
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

              {/* Sub-Station Name */}
              <div className="col-span-1">
                <div className="relative z-0 w-full group">
                  <input
                    className={input}
                    value={row.subStationName}
                    autoComplete="off"
                    onChange={(e) =>
                      handleChange(row.id, "subStationName", e.target.value)
                    }
                  />
                  <label className={label}>
                    SubStation(Transmission)
                    <span
                      className="text-red-500"
                      style={{ fontSize: "1.30rem" }}
                    >
                      *
                    </span>
                  </label>
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
                    T-D Interface
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={select}
                    value={row.tdInterface}
                    onChange={(e) =>
                      handleChange(row.id, "tdInterface", e.target.value)
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
            onClick={isEdit ? updateSubstationMaster : saveSubstationMaster}
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

export default AddSubstation;
