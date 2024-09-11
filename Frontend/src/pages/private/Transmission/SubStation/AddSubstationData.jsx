import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Loader from "../../../../component/Loader";
import { btn, input, label, select } from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";

function AddSubstationData() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();

  const [zones, setZones] = useState([]);
  const [circles, setCircles] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    zone_ID: "",
    circle_ID: "",
    division_ID: "",
    divisionName: "",
    districtName: "",
    substationName: "",
    voltageLevel: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchZones();
    fetchDistricts();
    if (pageName !== "AddSubstationData") {
      try {
        const data = JSON.parse(pageName);
        setIsEdit(true);
        setLocalBodyData({
          id: data._id,
          zone_ID: data.zone_ID,
          circle_ID: data.circle_ID,
          division_ID: data.division_ID,
          divisionName: data.divisionName,
          districtName: data.districtName,
          substationName: data.substationName,
          voltageLevel: data.voltageLevel,
        });
        fetchCircles(data.zone_ID);
        fetchDivisions(data.circle_ID);
      } catch (error) {
        console.error("Error parsing pageName:", error);
      }
    } else {
      setIsEdit(false);
    }
  }, [pageName]);

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
      setError(error.response ? error.response.data : error.message);
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
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisions = async (circleId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}transmission/list-division`,
        { circle_ID: circleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDivisions(response.data.result.docs || []);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}transmission/list-districts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDistricts(response.data.result.docs || []);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSubstationData = async () => {
    setLoading(true);

    const data = {
      zone_ID: localBodyData.zone_ID,
      circle_ID: localBodyData.circle_ID,
      division_ID: localBodyData.division_ID,
      divisionName: localBodyData.divisionName,
      districtName: localBodyData.districtName,
      substationName: localBodyData.substationName,
      voltageLevel: localBodyData.voltageLevel,
    };

    try {
      const response = await axios.post(
        `${apiUrl}transmission/add-substation`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        text: "Substation saved successfully.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#007bff",
      }).then(() => {
        navigate("/SubstationDataList");
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

  const updateSubstationData = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      zone_ID: localBodyData.zone_ID,
      circle_ID: localBodyData.circle_ID,
      division_ID: localBodyData.division_ID,
      divisionName: localBodyData.divisionName,
      districtName: localBodyData.districtName,
      substationName: localBodyData.substationName,
      voltageLevel: localBodyData.voltageLevel,
    };
    try {
      await axios.put(`${apiUrl}transmission/edit-substation`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        text: "Substation updated successfully.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#007bff",
      }).then(() => {
        navigate("/SubstationDataList");
      });
      resetForm();
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Error updating substation.",
        "error"
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
      divisionName: "",
      districtName: "",
      substationName: "",
      voltageLevel: "",
    });
    setCircles([]);
    setDivisions([]);
    setIsEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "zone_ID") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        circle_ID: "",
        division_ID: "",
      }));
      fetchCircles(value);
    } else if (name === "circle_ID") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        division_ID: "",
      }));
      fetchDivisions(value);
    } else if (name === "division_ID") {
      const selectedDivision = divisions.find(
        (division) => division._id === value
      );
      setLocalBodyData((prevData) => ({
        ...prevData,
        division_ID: value,
        divisionName: selectedDivision ? selectedDivision.divisionName : "",
      }));
    }
  };

  return (
    <>
      <Header
        title={isEdit ? "Update Substation" : "Add Substation"}
        action={{
          button: "Substation List",
          path: "/SubstationDataList",
        }}
      />
      {loading && <Loader />}
      <FormPanel>
        {/* Zone Dropdown */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Zone
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="zone_ID"
              value={localBodyData.zone_ID}
              onChange={handleInputChange}
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

        {/* Circle Dropdown */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Circle
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="circle_ID"
              value={localBodyData.circle_ID}
              onChange={handleInputChange}
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

        {/* Division Dropdown */}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Division
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="division_ID"
              value={localBodyData.division_ID}
              onChange={handleInputChange}
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
            <label className={label}>
              District
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="districtName"
              value={localBodyData.districtName}
              onChange={handleInputChange}
              className={select}
            >
              <option value="">--Select--</option>
              {districts.map((district) => (
                <option key={district._id} value={district.districtName}>
                  {district.districtName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="substationName"
              placeholder=""
              autoComplete="off"
              value={localBodyData.substationName}
              onChange={handleInputChange}
              className={input}
            />
            <label className={label}>
              Substation Name
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="voltageLevel"
              autoComplete="off"
              placeholder=""
              value={localBodyData.voltageLevel}
              onChange={handleInputChange}
              className={input}
            />
            <label className={label}>
              Voltage Level
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-4">
          <button
            type="button"
            className={btn}
            onClick={isEdit ? updateSubstationData : saveSubstationData}
          >
            {isEdit ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className={btn}
            onClick={resetForm}
            style={{ backgroundColor: "#f44336" }}
          >
            Reset
          </button>
        </div>
      </FormPanel>
    </>
  );
}

export default AddSubstationData;
