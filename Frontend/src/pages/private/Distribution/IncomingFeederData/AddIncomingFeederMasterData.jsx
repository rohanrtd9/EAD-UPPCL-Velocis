import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../../component/Loader";
import { CiCircleList } from "react-icons/ci";

function AddDivision() {
  const [division, setDivision] = useState([]);
  const [substation, setSubStation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { pageName } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();

  const [localBodyData, setLocalBodyData] = useState({
    divisionName: "",
    substationName: "",
    feederName: "",
    feederVoltage: "",
    meterMake: "",
    meterSLNo: "",
    overAllMF: "",
  });

  useEffect(() => {
    listDivision();
  }, []);

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

  const fetchSubStations = async (divisionName) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-substation`,
        { divisionName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubStation(response.data.result.docs || []);
    } catch (error) {
      console.error("Error fetching substations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "divisionName") {
      const selectedDivision = division.find(
        (div) => div.divisionName === value
      );
      if (selectedDivision) {
        fetchSubStations(selectedDivision.divisionName);
      } else {
        setSubStation([]);
      }
    }
  };

  useEffect(() => {
    if (pageName !== "AddIncomingFeederMasterData") {
      try {
        const data = JSON.parse(pageName);
        setIsEdit(true);
        setLocalBodyData({
          id: data._id,
          divisionName: data.divisionName,
          substationName: data.substationName,
          feederName: data.feederName,
          feederVoltage: data.feederVoltage,
          meterMake: data.meterMake,
          meterSLNo: data.meterSLNo,
          overAllMF: data.overAllMF,
        });
        fetchSubStations(data.divisionName);
      } catch (error) {
        console.error("Error parsing pageName:", error);
      }
    } else {
      setIsEdit(false);
    }
  }, [pageName]);

  const saveIncomingFeeder = async () => {
    setLoading(true);
    const data = {
      divisionName: localBodyData.divisionName,
      substationName: localBodyData.substationName,
      feederName: localBodyData.feederName,
      feederVoltage: localBodyData.feederVoltage,
      meterMake: localBodyData.meterMake,
      meterSLNo: localBodyData.meterSLNo,
      overAllMF: localBodyData.overAllMF,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/add-incomming-feeder`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Data Saved Successfully",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
          background: "#fff",
          iconColor: "#3085d6",
        }).then(() => {
          navigate("/IncomingFeederMasterData");
        });
        resetForm();
      } else {
        throw new Error("Unexpected response status.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error saving Data.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
        background: "#fff",
        iconColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateIncomingFeeder = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      divisionName: localBodyData.divisionName,
      substationName: localBodyData.substationName,
      feederName: localBodyData.feederName,
      feederVoltage: localBodyData.feederVoltage,
      meterMake: localBodyData.meterMake,
      meterSLNo: localBodyData.meterSLNo,
      overAllMF: localBodyData.overAllMF,
    };

    try {
      const response = await axios.put(`${apiUrl}edit-incomming-feeder`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
      Swal.fire({
        text: "Record updated successfully.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/IncomingFeederMasterData");
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
      divisionName: "",
      substationName: "",
      feederName: "",
      feederVoltage: "",
      meterMake: "",
      meterSLNo: "",
      overAllMF: "",
    });
    setIsEdit(false);
  };

  return (
    <>
      <Header
        title={
          isEdit
            ? "Update Incoming Feeder Master"
            : "Add Incoming Feeder Master"
        }
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
              Incoming Feeder List
            </div>
          ),
          path: "/IncomingFeederMasterData",
        }}
      />

      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Division Name
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
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Distribution Sub-Station Name
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="substationName"
              className={select}
              value={localBodyData.substationName}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {substation.map((sub) => (
                <option key={sub._id} value={sub.substationName}>
                  {sub.substationName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Feeder Name{" "}
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="feederName"
              className={select}
              value={localBodyData.feederName}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="INC-1">INC-1</option>
              <option value="INC-2">INC-2</option>
              <option value="INC-3">INC-3</option>
              <option value="INC-4">INC-4</option>
              <option value="INC-5">INC-5</option>
              <option value="INC-6">INC-6</option>
              <option value="INC-7">INC-7</option>
              <option value="INC-8">INC-8</option>
              <option value="INC-9">INC-9</option>
              <option value="INC-10">INC-10</option>
              <option value="INC-11">INC-11</option>
              <option value="INC-12">INC-12</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Feeder Voltage{" "}
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="feederVoltage"
              className={select}
              value={localBodyData.feederVoltage}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="11">11</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="meterMake"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.meterMake}
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
              name="meterSLNo"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.meterSLNo}
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
              name="overAllMF"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.overAllMF}
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

        <div className="col-span-3 justify-between space-x-4">
          <button
            className={btn}
            onClick={isEdit ? updateIncomingFeeder : saveIncomingFeeder}
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

export default AddDivision;
