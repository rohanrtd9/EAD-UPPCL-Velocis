import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../utils/userContext";
import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import Loader from "../../../../component/Loader";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";

import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";
import { apiUrl } from "../../../../utils/constant";

function MonthlyEnergyReportTD() {
  return (
    <>
      <Header
        title="Monthly Energy TD Report"
        action={{
          button: "",
          path: "",
        }}
      />

      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Zone (Transmission)</label>
            <select name="zone_ID" className={select}>
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Circle (Transmission)</label>
            <select name="circle_ID" className={select}>
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Division (Transmission)</label>
            <select name="division_ID" className={select}>
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Name Of Substation</label>
            <select name="division_ID" className={select}>
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Interface Type</label>
            <select name="division_ID" className={select}>
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Energy Account Month</label>
            <select name="division_ID" className={select}>
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select name="division_ID" className={select}>
              <option>--Select--</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 justify-between space-x-4">
          <button className={btn}>Submit</button>
          <button className={removebtn} style={{ backgroundColor: "red" }}>
            Reset
          </button>
        </div>
      </FormPanel>

      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>Zone</Th>
            <Th>Circle</Th>
            <Th>Division</Th>
            <Th>Substation</Th>
            <Th>Feeder/Bay</Th>
            <Th>Energy Meter Serial No</Th>
            <Th>Interface Type</Th>
            <Th>Month</Th>
            <Th>Year</Th>
            <Th>Import Energy (Transmission)</Th>
            <Th>Export Energy (Transmission)</Th>
            <Th>Name of Distribution S/S and 33kv and above Consumer Feeder</Th>
            <Th>Receipt Energy For Month</Th>
            <Th>Name of Distribution Division</Th>
            <Th>Name of Distribution Discom</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Tr>
              <Th colSpan="5" style={{ textAlign: "center" }}>
                No Record Found
              </Th>
            </Tr>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}

export default MonthlyEnergyReportTD;
