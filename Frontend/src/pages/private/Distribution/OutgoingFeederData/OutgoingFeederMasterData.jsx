import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../../utils/constant";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../../component/Loader";
import { IoAddCircleSharp } from "react-icons/io5";

import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";

function OutgoingFeederMasterData() {
  const [discom, setDiscom] = useState([]);
  const [zone, setZone] = useState([]);
  const [circle, setCircle] = useState([]);
  const [division, setDivision] = useState([]);
  const [subStation, setSubStation] = useState([]);
  const [outgoingFeederData, setOutgoingFeederData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { pageName } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();

  const [localBodyData, setLocalBodyData] = useState({
    discomName: "",
    zoneName: "",
    circleName: "",
    divisionName: "",
    substationName: "",
  });

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
      setDiscom(response.data.result.docs || []);
      setZone([]);
    } catch (error) {
      console.error("Error fetching discoms:", error);
    } finally {
      setLoading(false);
    }
  };

  const listDiscomZone = async (discom_ID) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-discom-zone`,
        { discom_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setZone(response.data.result.docs || []);
      setCircle([]);
      setDivision([]);
      setSubStation([]);
    } catch (error) {
      console.error("Error fetching zones:", error);
    } finally {
      setLoading(false);
    }
  };

  const listZoneCircle = async (zone_ID) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-zone-circle`,
        { zone_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCircle(response.data.result.docs || []);
      setDivision([]);
      setSubStation([]);
    } catch (error) {
      console.error("Error fetching circles:", error);
      Swal.fire("Error", "Failed to fetch Circle data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const listCircleDivision = async (circle_ID) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}list-circle-division`,
        { circle_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDivision(response.data.result.docs || []);
      setSubStation([]);
    } catch (error) {
      console.error("Error fetching Division:", error);
      Swal.fire("Error", "Failed to fetch Division data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const listDivisionSubstation = async (divisionName) => {
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
      console.error("Error fetching Substation:", error);
      Swal.fire("Error", "Failed to fetch Substation data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const listOutgoingFeeder = async () => {
    setLoading(true);
    const data = {
      discomName: localBodyData.discomName,
      zoneName: localBodyData.zoneName,
      circleName: localBodyData.circleName,
      divisionName: localBodyData.divisionName,
      substationName: localBodyData.substationName,
    };
    try {
      const response = await axios.post(`${apiUrl}list-outgoing-feeder`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOutgoingFeederData(response.data.result.docs || []);
    } catch (error) {
      console.error("Error fetching Outgoing Feeders:", error);
      Swal.fire("Error", "Failed to fetch Outgoing Feeder data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      localBodyData.discomName &&
      localBodyData.zoneName &&
      localBodyData.circleName &&
      localBodyData.divisionName &&
      localBodyData.substationName
    ) {
      setShowTable(true);
      await listOutgoingFeeder();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill all dropdowns before submitting.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#d33",
        background: "#fff",
        iconColor: "#d33",
      });
    }
  };

  useEffect(() => {
    listDiscom();
  }, []);

  const handleDiscomChange = (e) => {
    const discomName = e.target.value;
    setLocalBodyData({ ...localBodyData, discomName });
    const selectedDiscom = discom.find((d) => d.discomName === discomName);
    if (selectedDiscom) {
      listDiscomZone(selectedDiscom._id);
    }
  };

  const handleZoneChange = (e) => {
    const zoneName = e.target.value;
    setLocalBodyData({ ...localBodyData, zoneName });
    const selectedZone = zone.find((z) => z.zoneName === zoneName);
    if (selectedZone) {
      listZoneCircle(selectedZone._id);
    }
  };

  const handleCircleChange = (e) => {
    const circleName = e.target.value;
    setLocalBodyData({ ...localBodyData, circleName });
    const selectedCircle = circle.find((c) => c.circleName === circleName);
    if (selectedCircle) {
      listCircleDivision(selectedCircle._id);
    }
  };

  const handleDivisionChange = (e) => {
    const divisionName = e.target.value;
    setLocalBodyData({ ...localBodyData, divisionName });
    const selectedDivision = division.find(
      (d) => d.divisionName === divisionName
    );
    if (selectedDivision) {
      listDivisionSubstation(selectedDivision.divisionName);
    }
  };

  const handleSubstationChange = (e) => {
    setLocalBodyData({ ...localBodyData, substationName: e.target.value });
  };

  const handleReset = () => {
    setLocalBodyData({
      discomName: "",
      zoneName: "",
      circleName: "",
      divisionName: "",
      substationName: "",
    });
    setDiscom([]);
    setZone([]);
    setCircle([]);
    setDivision([]);
    setSubStation([]);
    setOutgoingFeederData([]);
    setShowTable(false);
  };

  return (
    <>
      <Header
        title="Distribution Outgoing Feeder Master Data"
        action={{
          button: "",
          path: "",
        }}
      />

      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Discom</label>
            <select
              className={select}
              value={localBodyData.discomName}
              name="discomName"
              onChange={handleDiscomChange}
            >
              <option value="">--Select--</option>
              {discom.map((discom) => (
                <option key={discom._id} value={discom.discomName}>
                  {discom.discomName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Zone</label>
            <select
              className={select}
              name="zoneName"
              value={localBodyData.zoneName}
              onChange={handleZoneChange}
            >
              <option value="">--Select--</option>
              {zone.map((z) => (
                <option key={z._id} value={z.zoneName}>
                  {z.zoneName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Circle</label>
            <select
              className={select}
              name="circleName"
              value={localBodyData.circleName}
              onChange={handleCircleChange}
            >
              <option value="">--Select--</option>
              {circle.map((c) => (
                <option key={c._id} value={c.circleName}>
                  {c.circleName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Division</label>
            <select
              className={select}
              name="divisionName"
              value={localBodyData.divisionName}
              onChange={handleDivisionChange}
            >
              <option value="">--Select--</option>
              {division.map((d) => (
                <option key={d._id} value={d.divisionName}>
                  {d.divisionName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}> Name Of Substation</label>
            <select
              className={select}
              name="substationName"
              value={localBodyData.substationName}
              onChange={handleSubstationChange}
            >
              <option value="">--Select--</option>
              {subStation.map((s) => (
                <option key={s._id} value={s.substationName}>
                  {s.substationName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-3 justify-between space-x-4">
          <button type="button" className={btn} onClick={handleSubmit}>
            Submit
          </button>
          <button
            type="button"
            className={`${removebtn} bg-red-500`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </FormPanel>

      {loading && <Loader />}

      {showTable && (
        <div className="px-4 py-2">
          <Table>
            <Thead>
              <Tr>
                <Th>Division Name</Th>
                <Th>SubStation Name</Th>
                <Th>Incoming Feeder Name</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {outgoingFeederData.length > 0 ? (
                outgoingFeederData.map((feeder) => (
                  <Tr key={feeder._id}>
                    <Td>{feeder.divisionName}</Td>
                    <Td>{feeder.substationName}</Td>
                    <Td>{feeder.feederName}</Td>
                    <Td>
                      <Link
                        to={`/outgoingFeederAction/AddOutgoingFeederMasterData?id=${
                          feeder._id
                        }&division=${encodeURIComponent(
                          feeder.divisionName
                        )}&subStation=${encodeURIComponent(
                          feeder.substationName
                        )}&feederName=${encodeURIComponent(feeder.feederName)}`}
                        className="link-button"
                      >
                        <button className={btn}>
                          <IoAddCircleSharp
                            style={{
                              fontSize: "18px",
                              color: "#DCDCDC",
                              marginRight: "2px",
                            }}
                          />
                        </button>
                      </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="5" className="centered-text">
                    No data available
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default OutgoingFeederMasterData;
