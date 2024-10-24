import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  ListItem,
  ListItemPrefix,
  List,
} from "@material-tailwind/react";
import { RiDashboard3Line } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";

import {
  PresentationChartBarIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import uppclLogo from "./../assets/logo.jpeg";
import { useLocation, NavLink } from "react-router-dom";
import { useUserContext } from "../utils/userContext";

const CustomLink = ({ to, title, activeLink }) => {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={to}
      className={activeLink && pathname === activeLink && "active"}
    >
      <ListItem>
        <ListItemPrefix>
          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        </ListItemPrefix>
        {title}
      </ListItem>
    </NavLink>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(0);
  const [activeLink, setActiveLink] = useState("/"); // Default active link
  const navigate = useNavigate();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    // Set active link based on current pathname
    setActiveLink(window.location.pathname);
  }, []);

  const { role } = useUserContext();
  return (
    <Card
      className="min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sideBar"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div className="mb-2 p-2">
        <img className="mx-auto w-100" src={uppclLogo} alt="logo" />
      </div>

      {role === "DIVISION" ? (
        <>
          <NavLink to="/">
            <ListItem className="border-b border-gray-300">
              <ListItemPrefix>
                <RiDashboard3Line className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </ListItem>
          </NavLink>

          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
            className="border-b border-gray-300"
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Masters
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <CustomLink
                  to="/zone"
                  activeLink="/zoneAction/addZone"
                  title="Zone Masters"
                />
                <CustomLink
                  to="/circle"
                  activeLink="/circleAction/addCircle"
                  title="Circle Masters"
                />
                <CustomLink
                  to="/division"
                  activeLink="/divisionAction/addDivision"
                  title="Division Masters"
                />
                <CustomLink
                  to="/district"
                  activeLink="/districtAction/addDistrict"
                  title="District Masters"
                />
                <CustomLink
                  to="/substations"
                  activeLink="/substationAction/AddSubstation"
                  title="Substation Masters"
                />
                <CustomLink
                  to="/incomingFeederMasterData"
                  activeLink="/incomingFeederAction/AddIncomingFeederMasterData"
                  title="Incoming Feeder Master Data"
                />
                <CustomLink
                  to="/outgoingFeederMaterData"
                  activeLink="/outgoingFeederAction/AddOutgoingFeederMasterData"
                  title="Outgoing Feeder Master Data"
                />
                <CustomLink
                  to="/kv33ConsumerFeederMaster"
                  activeLink="/outgoingFeeder33KVAction/AddKV33ConsumerFeederData"
                  title="33 KV & Above Consumer Master"
                />
                <CustomLink to="/transformer" title="Transformer Master" />
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 4}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 4 ? "rotate-180" : ""
                }`}
              />
            }
            className="border-b border-gray-300"
          >
            <ListItem className="p-0" selected={open === 4}>
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <GrTransaction className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Transaction
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <CustomLink
                  to="/AddTransactionStatusByAdmin"
                  title="Add Substation Metering Status By Admin"
                />
                <CustomLink
                  to="/EditTransactionStatusByAdmin"
                  title="Edit Substation Metering Status By Admin"
                />
                <CustomLink
                  to="/Add33KVStatusByAdmin"
                  title="Add 33KV & Above Consumer Feeder Metering Status By Admin"
                />
                <CustomLink
                  to="/Edit33KVStatusByAdmin"
                  title="Edit 33KV & Above Consumer Feeder Metering Status By Admin"
                />
              </List>
            </AccordionBody>
          </Accordion>

          {/* Distribution Report */}
          <Accordion
            open={open === 2}
            className="border-b border-gray-300"
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <DocumentCheckIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Report
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <CustomLink
                  to="/substation-metering-status-report"
                  title="Substation Metering Status Report"
                />
                <CustomLink
                  to="/monthly-line-loss-report"
                  title="Monthly Line Loss Report"
                />
                <CustomLink
                  to="/division-wise-line-loss-report"
                  title="Line Loss Report (Independent Feeders)"
                />
                <CustomLink
                  to="/division-wise-independent-feeder-metering-status-report"
                  title="Sub-Station Metering Status Report (Independent Feeder)"
                />
                <CustomLink
                  to="/substation-energy-receipt"
                  title="Substation Energy Receipt Month Wise"
                />
                <CustomLink
                  to="/33kv-above-feeder-master-energy-receipt"
                  title="33KV & Above Energy Receipt Month Wise"
                />
                <CustomLink
                  to="/master-substation-with-bay-point"
                  title="Substation Master With Feeder Bay Point"
                />
                <CustomLink
                  to="/33kv-master-bay-point"
                  title="33KV & Above Feeder With Bay Point"
                />
                <CustomLink
                  to="/distribution-transmission-transaction"
                  title="Distribution and Transmission Transaction Month Wise"
                />
              </List>
            </AccordionBody>
          </Accordion>
        </>
      ) : (
        <>
          {/* Transmission Dashboard */}
          <NavLink to="/TransMisstionDashboard">
            <ListItem className="border-b border-gray-300">
              <ListItemPrefix>
                <RiDashboard3Line className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </ListItem>
          </NavLink>

          {/* Transmission Master Accordion */}
          <Accordion
            open={open === 3}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 3 ? "rotate-180" : ""
                }`}
              />
            }
            className="border-b border-gray-300"
          >
            <ListItem className="p-0" selected={open === 3}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Master
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <CustomLink
                  to="/zoneTranmissionList"
                  activeLink="/zoneTransmissionAction/addZoneTransmission"
                  title="Zone"
                />
                <CustomLink
                  to="/circleTransmission"
                  activeLink="/circleTransmissionAction/addCircle"
                  title="Circle"
                />
                <CustomLink
                  to="/divisionTransmission"
                  activeLink="/divisionTransmissionAction/addDivision"
                  title="Division"
                />
                <CustomLink
                  to="/districtTransmission"
                  activeLink="/districtTransmissionAction/addDistrict"
                  title="District"
                />
                <CustomLink
                  to="/SubstationDataList"
                  activeLink="/subStationTransmissionAction/AddSubstationData"
                  title="Name Of Substation"
                />
                <CustomLink
                  to="/FeederBayDataList"
                  activeLink="/subStationTransmissionAction/AddFeederBayData"
                  title="Name Of Feeder/Bay"
                />
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 6}
            className="border-b border-gray-300"
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 6 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 6}>
              <AccordionHeader
                onClick={() => handleOpen(6)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <GrTransaction className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Transaction
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <CustomLink
                  to="/add-transmission-feeder-metering-status"
                  title="Add Transmission Feeder Metering Status By Admin"
                />
                <CustomLink
                  to="/edit-transmission-feeder-metering-status"
                  title="Edit Transmission Feeder Metering Status By Admin"
                />
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 7}
            className="border-b border-gray-300"
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 7 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 7}>
              <AccordionHeader
                onClick={() => handleOpen(7)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <DocumentCheckIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Report
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <CustomLink to="/MasterDataReport" title="Master Data Report" />
              </List>
              <List className="p-0">
                <CustomLink
                  to="/MonthlyEnergyReport"
                  title="Monthly Energy Report"
                />
              </List>
              <List className="p-0">
                <CustomLink
                  to="/MonthlyEnergyReportTD"
                  title="Monthly Energy Report (T-D)"
                />
              </List>
            </AccordionBody>
          </Accordion>
        </>
      )}
      <NavLink onClick={() => logout()} to={"/login"}>
        <ListItem className="border-b border-gray-300 cursor-pointer">
          <ListItemPrefix>
            <IoIosLogOut className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            Logout
          </Typography>
        </ListItem>
      </NavLink>
    </Card>
  );
};

export default Sidebar;
