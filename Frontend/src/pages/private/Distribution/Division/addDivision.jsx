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

function AddDivision() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const [discoms, setDiscoms] = useState([]);
  const [zones, setZones] = useState([]);
  const [circles, setCircles] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    id: "",
    discom_ID: "",
    zone_ID: "",
    circle_ID: "",
    divisionName: "",
    divisionCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (pageName !== "addDivision") {
      try {
        const data = JSON.parse(pageName);
        setIsEdit(true);
        setLocalBodyData({
          id: data._id,
          discom_ID: data.discom_ID,
          zone_ID: data.zone_ID,
          circle_ID: data.circle_ID,
          divisionName: data.divisionName,
          divisionCode: data.divisionCode,
        });
        fetchZones(data.discom_ID);
        fetchCircles(data.zone_ID);
      } catch (error) {
        console.error("Error parsing pageName:", error);
      }
    } else {
      setIsEdit(false);
    }
    listDiscoms();
  }, [pageName]);

  const listDiscoms = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-discom`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.result && response.data.result.docs) {
        setDiscoms(response.data.result.docs);
      } else {
        console.error("Invalid discom response structure:", response);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Discom Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchZones = async (discomId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-discom-zone`,
        { discom_ID: discomId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.result && response.data.result.docs) {
        setZones(response.data.result.docs);
      } else {
        console.error("Invalid zone response structure:", response);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Zone Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCircles = async (zoneId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-zone-circle`,
        { zone_ID: zoneId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.result && response.data.result.docs) {
        setCircles(response.data.result.docs);
      } else {
        console.error("Invalid circle response structure:", response);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Circle Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveDivisionMaster = async () => {
    setLoading(true);
    const data = {
      discom_ID: localBodyData.discom_ID,
      zone_ID: localBodyData.zone_ID,
      circle_ID: localBodyData.circle_ID,
      divisionName: localBodyData.divisionName,
      divisionCode: localBodyData.divisionCode,
    };
    try {
      const response = await axios.post(`${apiUrl}/add-division`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Division Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/division");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error saving division.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
      });
      console.error(
        "Error Saving Division Record:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateDivisionMaster = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      discom_ID: localBodyData.discom_ID,
      zone_ID: localBodyData.zone_ID,
      circle_ID: localBodyData.circle_ID,
      divisionName: localBodyData.divisionName,
      divisionCode: localBodyData.divisionCode,
    };

    try {
      const response = await axios.put(`${apiUrl}/edit-division`, data, {
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
        navigate("/division");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        text: error.response?.data?.message || "Error updating division.",
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
      discom_ID: "",
      zone_ID: "",
      circle_ID: "",
      divisionName: "",
      divisionCode: "",
    });
    setZones([]);
    setCircles([]);
    setIsEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "discom_ID") {
      // Reset zone and circle when discom changes
      setLocalBodyData((prevData) => ({
        ...prevData,
        zone_ID: "",
        circle_ID: "",
      }));
      fetchZones(value);
      setCircles([]); // Reset circles when discom changes
    } else if (name === "zone_ID") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        circle_ID: "", // Reset circle when zone changes
      }));
      fetchCircles(value);
    }
  };

  return (
    <>
      <Header
        title={isEdit ? "Update Division" : "Add Division"}
        action={{
          button: "Division List",
          path: "/division",
        }}
      />
      <FormPanel>
        {loading && <Loader />}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Discom Name</label>
            <select
              name="discom_ID"
              className={select}
              value={localBodyData.discom_ID}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {discoms.map((discom) => (
                <option key={discom._id} value={discom._id}>
                  {discom.discomName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Zone (Distribution)</label>
            <select
              name="zone_ID"
              className={select}
              value={localBodyData.zone_ID}
              onChange={handleInputChange}
              disabled={!localBodyData.discom_ID}
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
            <label className={label}>Circle (Distribution)</label>
            <select
              name="circle_ID"
              className={select}
              value={localBodyData.circle_ID}
              onChange={handleInputChange}
              disabled={!localBodyData.zone_ID}
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
            <label className={label}>Division Name</label>
            <input
              type="text"
              name="divisionName"
              autoComplete="off"
              className={input}
              value={localBodyData.divisionName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Division Code</label>
            <input
              type="text"
              autoComplete="off"
              name="divisionCode"
              className={input}
              value={localBodyData.divisionCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-span-3 justify-between space-x-4">
          <button
            type="submit"
            className={btn}
            onClick={isEdit ? updateDivisionMaster : saveDivisionMaster}
          >
            {isEdit ? "Update" : "Save"}
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
