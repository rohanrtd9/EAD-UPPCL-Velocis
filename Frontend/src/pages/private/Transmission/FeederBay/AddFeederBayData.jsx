import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
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

function AddFeederBayData() {
  const [zones, setZones] = useState([]);
  const [circles, setCircles] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [subStation, setSubStation] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { pageName } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();

  const [localBodyData, setLocalBodyData] = useState({
    zone_ID: "",
    circle_ID: "",
    division_ID: "",
    substation_ID: "",
    voltageLevel: "",
    baySubstationName: "",
    interfaceType: "",
    transactionType: "",
    discom: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      energyMeterSerialNo: "",
      mf: "",
      openingReadingImport: "",
      openingReadingExport: "",
      month: "",
      year: "",
      isAbandon: "",
    },
  ]);

  useEffect(() => {
    fetchZones();
    listMonth();
    listYear();
  }, []);

  useEffect(() => {
    if (isEdit && localBodyData.zone_ID !== "") {
      console.log("fetch circle in edit mode ", localBodyData.zone_ID);
      fetchCircles(localBodyData.zone_ID);
    }
  }, [localBodyData.zone_ID]);

  useEffect(() => {
    if (isEdit && localBodyData.circle_ID !== "") {
      console.log("fetch division in edit mode ", localBodyData.circle_ID);
      fetchDivisions(localBodyData.circle_ID);
    }
  }, [localBodyData.circle_ID]);

  useEffect(() => {
    if (isEdit && localBodyData.division_ID !== "") {
      console.log("fetch substation in edit mode ", localBodyData.division_ID);
      fetchSubStation(localBodyData.division_ID);
    }
  }, [localBodyData.division_ID]);

  useEffect(() => {
    if (pageName !== "AddFeederBayData") {
      try {
        const data = JSON.parse(pageName);
        const updatedData = data?.bayDetails.map((item, index) => {
          return {
            ...item,
            id: index + 1,
          };
        });
        setRows(updatedData);
        setIsEdit(true);
        setLocalBodyData({
          id: data._id,
          zone_ID: data.zone_ID,
          circle_ID: data.circle_ID,
          division_ID: data.division_ID,
          substation_ID: data.substation_ID,
          voltageLevel: data.voltageLevel,
          baySubstationName: data.baySubstationName,
          interfaceType: data.interfaceType,
          transactionType: data.transactionType,
          discom: data.discom,
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
      energyMeterSerialNo: "",
      mf: "",
      openingReadingImport: "",
      openingReadingExport: "",
      month: "",
      year: "",
      isAbandon: "",
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const fetchZones = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}transmission/list-zone`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setZones(response.data.result.docs || []);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response
          ? typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || JSON.stringify(error.response.data)
          : error.message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33", // Red color for the button
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCircles = async (zoneId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}transmission/list-zone-circle`,
        { zone_ID: zoneId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCircles(response.data.result.docs || []);
      if (!isEdit) {
        setDivisions([]);
        setSubStation([]);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response
          ? typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || JSON.stringify(error.response.data)
          : error.message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33", // Red color for the button
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisions = async (circleId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}transmission/list-division-circle`,
        { circle_ID: circleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDivisions(response.data.result.docs || []);
      if (!isEdit) {
        setSubStation([]);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response
          ? typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || JSON.stringify(error.response.data)
          : error.message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33", // Red color for the button
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubStation = async (divisionId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}transmission/list-division-substation`,
        { division_ID: divisionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubStation(response.data.result.docs || []);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response
          ? typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || JSON.stringify(error.response.data)
          : error.message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33", // Red color for the button
      });
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

  const saveFeederBayMaster = async () => {
    setLoading(true);
    const data = {
      ...localBodyData,
      bayDetails: rows,
    };
    try {
      const response = await axios.post(`${apiUrl}transmission/add-bay`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Feeder Bay Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/FeederBayDataList");
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

  const updateFeederBayMaster = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      zone_ID: localBodyData.zone_ID,
      circle_ID: localBodyData.circle_ID,
      division_ID: localBodyData.division_ID,
      substation_ID: localBodyData.substation_ID,
      voltageLevel: localBodyData.voltageLevel,
      baySubstationName: localBodyData.baySubstationName,
      interfaceType: localBodyData.interfaceType,
      transactionType: localBodyData.transactionType,
      discom: localBodyData.discom,
      bayDetails: rows,
    };

    try {
      const response = await axios.put(`${apiUrl}transmission/edit-bay`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        text: "Record updated successfully.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/FeederBayDataList");
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

  const resetForm = () => {
    setLocalBodyData({
      zone_ID: "",
      circle_ID: "",
      division_ID: "",
      substation_ID: "",
      voltageLevel: "",
      baySubstationName: "",
      interfaceType: "",
      transactionType: "",
      discom: "",
      energyMeterSerialNo: "",
      mf: "",
      openingReadingImport: "",
      openingReadingExport: "",
      month: "",
      year: "",
      isAbandon: "",
      bayDetails: rows,
    });
    setRows([{ id: Date.now() }]);
    setIsEdit(false);
  };

  return (
    <>
      <Header
        title={isEdit ? "Update Feeder/Bay" : "Add Feeder/Bay"}
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
              Feeder/Bay-Wise List
            </div>
          ),
          path: "/FeederBayDataList",
        }}
      />
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Zone (Transmission)</label>
            <select
              name="zone_ID"
              value={localBodyData.zone_ID}
              onChange={(e) => {
                const zoneId = e.target.value;
                setLocalBodyData((prev) => ({ ...prev, zone_ID: zoneId }));
                fetchCircles(zoneId);
              }}
              className={select}
            >
              <option value="">--Select--</option>
              {zones.map((zone) => (
                <option key={zone._id} value={zone._id}>
                  {zone.zoneName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Circle (Transmission)</label>
            <select
              name="circle_ID"
              value={localBodyData.circle_ID}
              onChange={(e) => {
                const circleId = e.target.value;
                setLocalBodyData((prev) => ({ ...prev, circle_ID: circleId }));
                fetchDivisions(circleId);
              }}
              className={select}
            >
              <option value="">--Select--</option>
              {circles.map((circle) => (
                <option key={circle._id} value={circle._id}>
                  {circle.circleName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Division (Transmission)</label>
            <select
              name="division_ID"
              value={localBodyData.division_ID}
              onChange={(e) => {
                const divisionId = e.target.value;
                setLocalBodyData((prev) => ({
                  ...prev,
                  division_ID: divisionId,
                }));
                fetchSubStation(divisionId);
              }}
              className={select}
            >
              <option value="">--Select--</option>
              {divisions.map((division) => (
                <option key={division._id} value={division._id}>
                  {division.divisionName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Name Of Substation</label>
            <select
              name="substation_ID"
              value={localBodyData.substation_ID}
              onChange={(e) =>
                setLocalBodyData((prev) => ({
                  ...prev,
                  substation_ID: e.target.value,
                }))
              }
              className={select}
            >
              <option value="">--Select--</option>
              {subStation.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.substationName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Voltage Level Of Feeder/Bay</label>
            <select
              name="voltageLevel"
              value={localBodyData.voltageLevel}
              onChange={handleInputChange}
              className={select}
              defaultValue=""
            >
              <option value="">--Select--</option>
              <option value="33">33</option>
              <option value="132">132</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              value={localBodyData.baySubstationName}
              onChange={handleInputChange}
              name="baySubstationName"
              className={input}
              autoComplete="off"
              placeholder=" "
            />
            <label className={label}>Name Of Feeder/Bay Of Substation</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Interface Type</label>
            <select
              value={localBodyData.interfaceType}
              onChange={handleInputChange}
              name="interfaceType"
              className={select}
              defaultValue=""
            >
              <option value="">--Select--</option>
              <option value="G-D">G-D</option>
              <option value="G-T">G-T</option>
              <option value="T-D">T-D</option>
              <option value="T-T">T-T</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Transaction Type</label>
            <select
              value={localBodyData.transactionType}
              onChange={handleInputChange}
              name="transactionType"
              className={select}
              defaultValue=""
            >
              <option value="">--Select--</option>
              <option value="Inter State">Inter State</option>
              <option value="Intra State">Intra State</option>
              <option value="Inter State (RE)">Inter State (RE)</option>
              <option value="Intra State (Non-RE)">Intra State (Non-RE)</option>
              <option value="Inter State (Non-RE)">Inter State (Non-RE)</option>
              <option value="Intra State (RE)">Intra State (RE)</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Discom (Transmission)</label>
            <select
              value={localBodyData.discom}
              onChange={handleInputChange}
              name="discom"
              className={select}
              defaultValue=""
            >
              <option value="">--Select--</option>
              <option value="With In Zone">With In Zone</option>
              <option value="Out Of Zone">Out Of Zone</option>
            </select>
          </div>
        </div>
        <div className="col-span-3">
          <Table>
            <Thead>
              <Tr>
                <Th>Energy Meter Serial No</Th>
                <Th>MF (MWh)</Th>
                <Th>Opening Reading (Import)</Th>
                <Th>Opening Reading (Export)</Th>
                <Th>Month</Th>
                <Th>Year</Th>
                <Th>Is Abandon</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row) => (
                <Tr key={row.id}>
                  <Td>
                    <input
                      type="text"
                      value={row.energyMeterSerialNo}
                      onChange={(e) =>
                        handleChange(
                          row.id,
                          "energyMeterSerialNo",
                          e.target.value
                        )
                      }
                      className={input}
                    />
                  </Td>
                  <Td>
                    <input
                      type="text"
                      value={row.mf}
                      onChange={(e) =>
                        handleChange(row.id, "mf", e.target.value)
                      }
                      className={input}
                    />
                  </Td>
                  <Td>
                    <input
                      type="text"
                      value={row.openingReadingImport}
                      onChange={(e) =>
                        handleChange(
                          row.id,
                          "openingReadingImport",
                          e.target.value
                        )
                      }
                      className={input}
                    />
                  </Td>
                  <Td>
                    <input
                      type="text"
                      value={row.openingReadingExport}
                      onChange={(e) =>
                        handleChange(
                          row.id,
                          "openingReadingExport",
                          e.target.value
                        )
                      }
                      className={input}
                    />
                  </Td>
                  <Td>
                    <select
                      value={row.month}
                      onChange={(e) =>
                        handleChange(row.id, "month", e.target.value)
                      }
                      className={select}
                    >
                      <option value="">--Select--</option>
                      {month.map((m) => (
                        <option key={m._id} value={m.monthName}>
                          {m.monthName}
                        </option>
                      ))}
                    </select>
                  </Td>
                  <Td>
                    <select
                      value={row.year}
                      onChange={(e) =>
                        handleChange(row.id, "year", e.target.value)
                      }
                      className={select}
                    >
                      <option value="">--Select--</option>
                      {year.map((y) => (
                        <option key={y._id} value={y.yearName}>
                          {y.yearName}
                        </option>
                      ))}
                    </select>
                  </Td>
                  <Td>
                    <select
                      value={row.isAbandon}
                      onChange={(e) =>
                        handleChange(row.id, "isAbandon", e.target.value)
                      }
                      className={select}
                    >
                      <option value="">--Select--</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </Td>
                  <Td>
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.id)}
                      className={`${removebtn} bg-red-500`}
                    >
                      <FaMinus />
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <button
            type="button"
            onClick={handleAddRow}
            className={`${btn} mt-4`}
          >
            <IoAddCircleSharp />
          </button>
        </div>
        <div className="col-span-3 justify-between space-x-4">
          <button
            className={btn}
            onClick={isEdit ? updateFeederBayMaster : saveFeederBayMaster}
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
      {loading && <Loader />}
    </>
  );
}

export default AddFeederBayData;
