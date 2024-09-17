import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Loader from "../../../../component/Loader";
import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";

function SubstationMeteringStatusReport() {
  const { pageName } = useParams();
  const { token } = useUserContext();
  const [discoms, setDiscoms] = useState([]);
  const [zones, setZones] = useState([]);
  const [circles, setCircles] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [substations, setSubstations] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [localBodyData, setLocalBodyData] = useState({
    discom_ID: "",
    zone_ID: "",
    circle_ID: "",
    division_ID: "",
    subStationName: "",
    month: "",
    year: "",
  });
  const navigate = useNavigate();

  const listDiscoms = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/list-discom`,
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

  const fetchZones = async (discom_ID) => {
    if (!discom_ID) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/list-discom-zone`,
        { discom_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setZones(response.data.result.docs || []);
    } catch (error) {
      console.error("Zone Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCircles = async (zone_ID) => {
    if (!zone_ID) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/list-zone-circle`,
        { zone_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCircles(response.data.result.docs || []);
    } catch (error) {
      console.error("Circle Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisions = async (circle_ID) => {
    if (!circle_ID) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/list-circle-division`,
        { circle_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDivisions(response.data.result.docs || []);
    } catch (error) {
      console.error("Division Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubstations = async (division_ID) => {
    if (!division_ID) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/list-division-substation`,
        { division_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubstations(response.data.result.docs || []);
    } catch (error) {
      console.error("Substation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonth = async () => {
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
      setMonths(response.data.result.docs || []);
    } catch (error) {
      console.error("Month Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchYear = async () => {
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
      setYears(response.data.result.docs || []);
    } catch (error) {
      console.error("Year Error:", error);
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

    if (name === "discom_ID") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        zone_ID: "",
        circle_ID: "",
        division_ID: "",
        subStationName: "",
      }));
      fetchZones(value);
      setCircles([]);
      setDivisions([]);
      setSubstations([]);
    } else if (name === "zone_ID") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        circle_ID: "",
        division_ID: "",
        subStationName: "",
      }));
      fetchCircles(value);
      setDivisions([]);
      setSubstations([]);
    } else if (name === "circle_ID") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        division_ID: "",
        subStationName: "",
      }));
      fetchDivisions(value);
      setSubstations([]);
    } else if (name === "division_ID") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        subStationName: "",
      }));
      fetchSubstations(value);
    }
  };

  const handleReset = () => {
    setLocalBodyData({
      discom_ID: "",
      zone_ID: "",
      circle_ID: "",
      division_ID: "",
      subStationName: "",
      month: "",
      year: "",
    });
    setZones([]);
    setCircles([]);
    setDivisions([]);
    setSubstations([]);
  };

  useEffect(() => {
    listDiscoms();
    fetchMonth();
    fetchYear();
  }, []);

  return (
    <>
      <Header
        title="Substation Metering Status Report"
        action={{
          button: "",
          path: "",
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
            <label className={label}>Zone</label>
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
            <label className={label}>Circle</label>
            <select
              name="circle_ID"
              className={select}
              value={localBodyData.circle_ID}
              onChange={handleInputChange}
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
            <label className={label}>Division</label>
            <select
              name="division_ID"
              className={select}
              value={localBodyData.division_ID}
              onChange={handleInputChange}
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
            <label className={label}>Name of Substation</label>
            <select
              name="subStationName"
              className={select}
              value={localBodyData.subStationName}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {substations.map((substation) => (
                <option key={substation._id} value={substation._id}>
                  {substation.substationName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Month</label>
            <select
              name="month"
              className={select}
              value={localBodyData.month}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {months.map((month) => (
                <option key={month._id} value={month._id}>
                  {month.monthName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select
              name="year"
              className={select}
              value={localBodyData.year}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {years.map((year) => (
                <option key={year._id} value={year._id}>
                  {year.yearName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-3 justify-between space-x-4">
          <button className={btn}>Submit</button>
          <button
            className={removebtn}
            style={{ backgroundColor: "red" }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </FormPanel>
    </>
  );
}

export default SubstationMeteringStatusReport;
