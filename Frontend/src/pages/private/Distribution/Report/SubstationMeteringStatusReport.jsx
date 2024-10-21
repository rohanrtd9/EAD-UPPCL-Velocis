import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Loader from "../../../../component/Loader";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import * as XLSX from "xlsx";

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
  const [reports, setSubstationReports] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tableVisible, setTableVisible] = useState(false);
  const [localBodyData, setLocalBodyData] = useState({
    discom_ID: "",
    zone_ID: "",
    circle_ID: "",
    division_ID: "",
    subStationName: "",
    month: "",
    year: "",
  });
  const [selectedData, setSelectedData] = useState({
    discomName: "",
    zoneName: "",
    circleName: "",
    divisionName: "",
    substationName: "",
  });

  const navigate = useNavigate();

  // List Discome Here

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

  // List Zone Here

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

  // List Circle Here

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

  // List Divison Here

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

  // List Substation Here

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

  // List Month Here

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

  // List Year Here

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

  const substionMeteringStatusReport = async () => {
    const {
      discomName,
      zoneName,
      circleName,
      divisionName,
      subStationName,
      month,
      year,
    } = selectedData;

    // Validation for mandatory fields
    if (
      !selectedData.discomName ||
      !selectedData.zoneName ||
      !selectedData.circleName ||
      !selectedData.divisionName ||
      !selectedData.substationName
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill all required fields.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}distribution/report/substionMeteringStatusReport`,
        selectedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.result);
      if (response.data && response.data.result && response.data.result.docs) {
        const reports = response.data.result.docs.map((doc) => ({
          discomName: doc.discomName,
          zoneName: doc.zoneName,
          circleName: doc.circleName,
          divisionName: doc.divisionName,
          substationName: doc.substationName,
          month: month,
          year: year,
          incomingFeeder: doc.incomingFeederDetails.feederName,
          outgoingFeeders: doc.incomingFeederDetails.outgoingFeederDetails.map(
            (outgoing) => outgoing.feederDetails
          ),
          meterMakeType: doc.incomingFeederDetails.meterMake,
          meterSLNo: doc.incomingFeederDetails.meterSLNo,
          previousReading: doc.incomingFeederDetails.previousReading,
          presentReading: doc.incomingFeederDetails.presentReading,
          difference: doc.incomingFeederDetails.difference,
          feederNature: doc.incomingFeederDetails.feederNature,
          overallMF: doc.incomingFeederDetails.overallMF,
          energyConsumption: doc.incomingFeederDetails.energyConsumption,
          energyAssessed: doc.incomingFeederDetails.energyAssessed,
          totalEnergyConsumption:
            doc.incomingFeederDetails.totalEnergyConsumption,
          meterStatus: doc.incomingFeederDetails.meterStatus,
          dateOfDefect: doc.incomingFeederDetails.dateOfDefect,
          remark: doc.incomingFeederDetails.remark,
          entryDateTime: doc.incomingFeederDetails.entryDateTime,
        }));
        setSubstationReports(reports);
        setTableVisible(true);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (reports.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No data to export.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(reports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SubstationReports");

    XLSX.writeFile(workbook, "SubstationMeteringStatusReport.xlsx");
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
    setTableVisible(false);
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

      {loading && <Loader />}
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>
              Discom Name
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="discom_ID"
              className={select}
              value={localBodyData.discom_ID}
              onChange={(e) => {
                const selectedDiscomId = e.target.value;
                const selectedDiscom = discoms.find(
                  (discom) => discom._id === selectedDiscomId
                );
                handleInputChange(e);
                setSelectedData((prevData) => ({
                  ...prevData,
                  discomName: selectedDiscom ? selectedDiscom.discomName : "",
                }));
              }}
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
            <label className={label}>
              Zone
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="zone_ID"
              className={select}
              value={localBodyData.zone_ID}
              onChange={(e) => {
                const selectedZoneId = e.target.value;
                const selectedZone = zones.find(
                  (zone) => zone._id === selectedZoneId
                );
                handleInputChange(e);
                setSelectedData((prevData) => ({
                  ...prevData,
                  zoneName: selectedZone ? selectedZone.zoneName : "",
                }));
              }}
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
            <label className={label}>
              Circle
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="circle_ID"
              className={select}
              value={localBodyData.circle_ID}
              onChange={(e) => {
                const selectedCircleId = e.target.value;
                const selectedCircle = circles.find(
                  (circle) => circle._id === selectedCircleId
                );
                handleInputChange(e);
                setSelectedData((prevData) => ({
                  ...prevData,
                  circleName: selectedCircle ? selectedCircle.circleName : "",
                }));
              }}
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
            <label className={label}>
              Division
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="division_ID"
              className={select}
              value={localBodyData.division_ID}
              onChange={(e) => {
                const selectedDivisionId = e.target.value;
                const selectedDivision = divisions.find(
                  (division) => division._id === selectedDivisionId
                );
                handleInputChange(e);
                setSelectedData((prevData) => ({
                  ...prevData,
                  divisionName: selectedDivision
                    ? selectedDivision.divisionName
                    : "",
                }));
              }}
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
              Name of Substation
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
            <select
              name="subStationName"
              className={select}
              value={localBodyData.subStationName}
              onChange={(e) => {
                const selectedSubstationId = e.target.value;
                const selectedSubstation = substations.find(
                  (substation) => substation._id === selectedSubstationId
                );
                handleInputChange(e);
                setSelectedData((prevData) => ({
                  ...prevData,
                  substationName: selectedSubstation
                    ? selectedSubstation.substationName
                    : "",
                }));
              }}
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
            <label className={label}>
              Month
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
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
            <label className={label}>
              Year
              <span className="text-red-500" style={{ fontSize: "1.30rem" }}>
                *
              </span>
            </label>
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
          <button className={btn} onClick={substionMeteringStatusReport}>
            Submit
          </button>
          <button
            className={btn}
            style={{ backgroundColor: "green" }}
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
          <button
            className={removebtn}
            style={{ backgroundColor: "red" }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </FormPanel>

      {loading && <Loader />}
      {/* {console.log(
        reports.length > 0 &&
          reports[0].outgoingFeeders[0][0].outgoingFeederName
      )} */}
      {tableVisible && (
        <Table>
          <Thead>
            <Tr>
              <Th>S.No.</Th>
              <Th>Discom</Th>
              <Th>Zone</Th>
              <Th>Circle</Th>
              <Th>Division</Th>
              <Th>Substation</Th>
              <Th>Month</Th>
              <Th>Year</Th>
              <Th>Incoming Feeder</Th>
              <Th>Outgoing Feeder</Th>
              <Th>Meter Make Type</Th>
              <Th>Meter SL No</Th>
              <Th>Previous Reading</Th>
              <Th>Present Reading</Th>
              <Th>Difference</Th>
              <Th>Feeder Nature</Th>
              <Th>Overall MF</Th>
              <Th>Energy Consumption</Th>
              <Th>Energy Assessed</Th>
              <Th>Total Energy Consumption</Th>
              <Th>Meter Status</Th>
              <Th>Date Of Defect</Th>
              <Th>Remark</Th>
              <Th>Entry Date & Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports.map((report, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{report.discomName}</Td>
                <Td>{report.zoneName}</Td>
                <Td>{report.circleName}</Td>
                <Td>{report.divisionName}</Td>
                <Td>{report.substationName}</Td>
                <Td>{report.month}</Td>
                <Td>{report.year}</Td>
                <Td>{report.incomingFeeder}</Td>
                <Td>{report.outgoingFeeders[0][0].outgoingFeederName}</Td>
                <Td>{report.meterMakeType}</Td>
                <Td>{report.meterSLNo}</Td>
                <Td>{report.previousReading}</Td>
                <Td>{report.presentReading}</Td>
                <Td>{report.difference}</Td>
                <Td>{report.feederNature}</Td>
                <Td>{report.overallMF}</Td>
                <Td>{report.energyConsumption}</Td>
                <Td>{report.energyAssessed}</Td>
                <Td>{report.totalEnergyConsumption}</Td>
                <Td>{report.meterStatus}</Td>
                <Td>{report.dateOfDefect}</Td>
                <Td>{report.remark}</Td>
                <Td>{report.entryDateTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
}

export default SubstationMeteringStatusReport;
