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

function AddCircle() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const [discoms, setDiscoms] = useState([]);
  const [zones, setZones] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    id: "",
    discom_Id: "",
    zone_Id: "",
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
          discom_Id: data.discom_Id,
          zone_Id: data.zone_Id,
          circleName: data.circleName,
          circleCode: data.circleCode,
        });
        fetchZones(data.discom_Id);
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
        `${apiUrl}list-zone`,
        { discom_Id: discomId },
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

  const saveCircleMaster = async () => {
    setLoading(true);
    const data = {
      discom_Id: localBodyData.discom_Id,
      zone_Id: localBodyData.zone_Id,
      circleName: localBodyData.circleName,
      circleCode: localBodyData.circleCode,
    };
    try {
      const response = await axios.post(`${apiUrl}/add-circle`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
        navigate("/circle");
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
      discom_Id: localBodyData.discom_Id,
      zone_ID: localBodyData.zone_Id,
      circleName: localBodyData.circleName,
      circleCode: localBodyData.circleCode,
    };

    console.log(data);
    try {
      const response = await axios.put(`${apiUrl}/edit-circle`, data, {
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
        navigate("/circle");
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
      discom_Id: "",
      zone_Id: "",
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

    if (name === "discom_Id") {
      fetchZones(value);
    }
  };

  return (
    <>
      <Header
        title={isEdit ? "Update Circle" : "Add Circle"}
        action={{
          button: "Circle List",
          path: "/circle",
        }}
      />
      <FormPanel>
        {loading && <Loader />}
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Discom Name</label>
            <select
              name="discom_Id"
              className={select}
              value={localBodyData.discom_Id}
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
              name="zone_Id"
              className={select}
              value={localBodyData.zone_Id}
              onChange={handleInputChange}
              disabled={!localBodyData.discom_Id}
            >
              <option value="">Select Zone</option>
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
        </div>
      </FormPanel>
    </>
  );
}

export default AddCircle;
