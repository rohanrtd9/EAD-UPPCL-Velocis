import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import { btn, input, label, select } from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../../component/Loader";
import { CiCircleList } from "react-icons/ci";

function AddCircle() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const [zones, setZones] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    id: "",
    zone_ID: "",
    circleName: "",
    circleCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (pageName !== "addCircle") {
      try {
        const data = JSON.parse(pageName);
        setIsEdit(true);
        setLocalBodyData({
          id: data._id,
          zone_ID: data.zone_ID,
          circleName: data.circleName,
          circleCode: data.circleCode,
        });
        fetchZones(); // Fetch zones for the specific discom
      } catch (error) {
        console.error("Error parsing pageName:", error);
      }
    } else {
      setIsEdit(false);
      fetchZones();
    }
  }, [pageName]);

  const fetchZones = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}transmission/list-zone`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure the response structure is valid before setting zones
      if (response?.data?.result?.docs) {
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

  const saveCircleMaster = async () => {
    setLoading(true);
    const data = {
      zone_ID: localBodyData.zone_ID,
      circleName: localBodyData.circleName,
      circleCode: localBodyData.circleCode,
    };
    try {
      const response = await axios.post(
        `${apiUrl}transmission/add-circle`,
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
        title: "Success!",
        text: "Circle Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
        background: "#fff",
        iconColor: "#3085d6",
      }).then(() => {
        navigate("/circleTransmission");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error saving circle.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
        background: "#fff",
        iconColor: "#d33",
      });
      console.error(
        "Error Saving Circle Record:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateCircleMaster = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      zone_ID: localBodyData.zone_ID,
      circleName: localBodyData.circleName,
      circleCode: localBodyData.circleCode,
    };

    try {
      const response = await axios.put(
        `${apiUrl}transmission/edit-circle`,
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
        navigate("/circleTransmission");
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
      circleName: "",
      circleCode: "",
    });
    setZones([]);
    setIsEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Header
        title={isEdit ? "Update Circle" : "Add Circle"}
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
              Circle List
            </div>
          ),
          path: "/circle",
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
            <input
              name="circleName"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.circleName}
              onChange={handleInputChange}
            />
            <label className={label}>Circle Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="circleCode"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.circleCode}
              onChange={handleInputChange}
            />
            <label className={label}>Circle Code</label>
          </div>
        </div>
        <div className="col-span-3 justify-between space-x-4">
          <button
            className={btn}
            onClick={isEdit ? updateCircleMaster : saveCircleMaster}
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

export default AddCircle;
