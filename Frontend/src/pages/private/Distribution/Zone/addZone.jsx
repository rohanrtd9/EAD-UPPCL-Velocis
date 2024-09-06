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

function AddZone() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const [discoms, setDiscoms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    id: "",
    discom_ID: "",
    zoneName: "",
    zoneCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (pageName !== "addZone") {
      setIsEdit(true);
      const data = JSON.parse(pageName);
      setLocalBodyData({
        id: data._id,
        discom_ID: data.discom_ID,
        zoneName: data.zoneName,
        zoneCode: data?.zoneCode,
      });
    } else {
      setIsEdit(false);
    }
  }, [pageName]);

  const listDiscom = async () => {
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

  useEffect(() => {
    if (token) {
      listDiscom();
    }
  }, [token]);

  const saveZoneMaster = async () => {
    setLoading(true);
    const data = {
      discom_ID: localBodyData.discom_ID,
      zoneName: localBodyData.zoneName,
      zoneCode: localBodyData.zoneCode,
    };
    try {
      const response = await axios.post(`${apiUrl}/add-zone`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
      Swal.fire({
        title: "Success!",
        text: "Zone Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
        background: "#fff",
        iconColor: "#3085d6",
      }).then(() => {
        navigate("/zone");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error saving zone.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
        background: "#fff",
        iconColor: "#d33",
      });
      console.error(
        "Error Saving Zone Record:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateZoneMaster = async () => {
    setLoading(true);
    const data = {
      id: localBodyData.id,
      discom_ID: localBodyData.discom_ID,
      zoneName: localBodyData.zoneName,
      zoneCode: localBodyData.zoneCode,
    };
    try {
      const response = await axios.put(`${apiUrl}/edit-zone`, data, {
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
        navigate("/zone");
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        text: error.response?.data?.message || "Error updating zone.",
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
      zoneName: "",
      zoneCode: "",
    });
    setIsEdit(false);
  };

  return (
    <>
      <Header
        title={isEdit ? "Update Zone" : "Add Zone"}
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
              Zone List
            </div>
          ),
          path: "/zone",
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
              onChange={(e) =>
                setLocalBodyData({
                  ...localBodyData,
                  discom_ID: e.target.value,
                })
              }
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
            <input
              name="zoneName"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.zoneName}
              onChange={(e) =>
                setLocalBodyData({ ...localBodyData, zoneName: e.target.value })
              }
            />
            <label className={label}>Zone Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="zoneCode"
              className={input}
              placeholder=" "
              autoComplete="off"
              value={localBodyData.zoneCode}
              onChange={(e) =>
                setLocalBodyData({ ...localBodyData, zoneCode: e.target.value })
              }
            />
            <label className={label}>Zone Code</label>
          </div>
        </div>
        <div className="col-span-3 justify-between space-x-4">
          <button
            className={btn}
            onClick={isEdit ? updateZoneMaster : saveZoneMaster}
            disabled={loading}
          >
            {loading ? "Processing..." : isEdit ? "Update" : "Save"}
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
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

export default AddZone;
