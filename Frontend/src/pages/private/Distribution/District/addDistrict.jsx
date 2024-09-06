import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Loader from "../../../../component/Loader";
import { btn, input, label } from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";
import { CiCircleList } from "react-icons/ci";

function AddDistrict() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [districtData, setDistrictData] = useState({
    id: "",
    districtName: "",
    districtCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (pageName !== "addDistrict") {
        const data = JSON.parse(pageName);
        setIsEdit(true);
        setDistrictData({
          id: data._id,
          districtName: data.districtName,
          districtCode: data.districtCode,
        });
      } else {
        setIsEdit(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error parsing pageName:", error);
      setError("Error parsing district data. Please try again.");
    }
  }, [pageName]);

  const saveDistrict = async () => {
    setLoading(true);
    setError(""); // Clear any existing errors
    const data = {
      districtName: districtData.districtName,
      districtCode: districtData.districtCode,
    };
    try {
      const response = await axios.post(`${apiUrl}/add-district`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "District Saved Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/district");
      });
      resetForm();
    } catch (error) {
      handleApiError(error, "Error saving district.");
    } finally {
      setLoading(false);
    }
  };

  const updateDistrict = async () => {
    setLoading(true);
    setError(""); // Clear any existing errors
    const data = {
      id: districtData.id,
      districtName: districtData.districtName,
      districtCode: districtData.districtCode,
    };

    try {
      const response = await axios.put(`${apiUrl}/edit-district`, data, {
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
        navigate("/district");
      });
      resetForm();
    } catch (error) {
      handleApiError(error, "Error updating district.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDistrictData({
      id: "",
      districtName: "",
      districtCode: "",
    });
    setIsEdit(false);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDistrictData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApiError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || defaultMessage;
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#d33",
    });
    setError(errorMessage);
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  };

  return (
    <>
      <Header
        title={isEdit ? "Update District" : "Add District"}
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
              District List
            </div>
          ),
          path: "/district",
        }}
      />

      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="districtName"
              value={districtData.districtName}
              onChange={handleInputChange}
              autoComplete="off"
              className={input}
              placeholder=" "
            />
            <label className={label}>District Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input
              name="districtCode"
              value={districtData.districtCode}
              onChange={handleInputChange}
              className={input}
              autoComplete="off"
              placeholder=" "
            />
            <label className={label}>District Code</label>
          </div>
        </div>
        <div className="col-span-3 justify-between space-x-4">
          <button
            type="submit"
            className={btn}
            onClick={isEdit ? updateDistrict : saveDistrict}
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
      {loading && <Loader />}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
    </>
  );
}

export default AddDistrict;
