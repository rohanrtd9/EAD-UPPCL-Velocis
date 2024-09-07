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
import { CiCircleList } from "react-icons/ci";

function AddDivision() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const [zones, setZones] = useState([]);
  const [circles, setCircles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    id: "",
    zone_ID: "",
    circle_ID: "",
    divisionName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchZones(); // Fetch zones on component mount

    if (pageName !== "addDivision") {
      try {
        const data = JSON.parse(pageName);
        setIsEdit(true);
        setLocalBodyData({
          id: data._id,
          zone_ID: data.zone_ID,
          circle_ID: data.circle_ID,
          divisionName: data.divisionName,
        });
        fetchCircles(data.zone_ID); // Fetch circles based on the existing zone_ID
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
        `${apiUrl}transmission/list-zone-circle`,
        { zone_ID: zoneId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.result && response.data.result.docs) {
        const fetchedCircles = response.data.result.docs;
        setCircles(fetchedCircles);

        // Check if the current circle_ID is in the fetched circles
        if (
          localBodyData.circle_ID &&
          !fetchedCircles.some(
            (circle) => circle._id === localBodyData.circle_ID
          )
        ) {
          setLocalBodyData((prevData) => ({
            ...prevData,
            circle_ID: "",
          }));
        }
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
      zone_ID: localBodyData.zone_ID,
      circle_ID: localBodyData.circle_ID,
      divisionName: localBodyData.divisionName,
    };
    try {
      const response = await axios.post(
        `${apiUrl}transmission/add-division`,
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
        text: "Division Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/divisionTransmission");
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
      zone_ID: localBodyData.zone_ID,
      circle_ID: localBodyData.circle_ID,
      divisionName: localBodyData.divisionName,
    };

    try {
      const response = await axios.put(
        `${apiUrl}transmission/edit-division`,
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
        navigate("/divisionTransmission");
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
      zone_ID: "",
      circle_ID: "",
      divisionName: "",
    });
    setCircles([]);
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
              Division List
            </div>
          ),
          path: "/divisionTransmission",
        }}
      />
      <FormPanel>
        {loading && <Loader />}

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Zone (Transmission)</label>
            <select
              name="zone_ID"
              className={select}
              value={localBodyData.zone_ID}
              onChange={handleInputChange}
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
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <button
            type="button"
            className={btn}
            onClick={isEdit ? updateDivisionMaster : saveDivisionMaster}
          >
            {isEdit ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className={btn}
            onClick={resetForm}
            style={{ backgroundColor: "#f44336" }} // Red color for reset button
          >
            Reset
          </button>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </FormPanel>
    </>
  );
}

export default AddDivision;
