import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  DocumentCheckIcon,
  BoltIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import uppclLogo from "./../assets/logo.jpeg";
import { useLocation, NavLink } from "react-router-dom";

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

export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sideBar">
      <div className="mb-2 p-2">
        <img className="mx-auto w-60" src={uppclLogo} alt="logo" />
      </div>
      <List>
        <NavLink to="/">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            Distribution Dashboard
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
                Distribution Masters
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <CustomLink
                to={"/zone"}
                activeLink={"/addZone"}
                title={"Zone Masters"}
              />
              <CustomLink
                to={"/circle"}
                activeLink={"/addCircle"}
                title={"Circle Masters"}
              />
              <CustomLink
                to={"/division"}
                activeLink={"/addDivision"}
                title={"Division Masters"}
              />
              <CustomLink
                to={"/district"}
                activeLink={"/addDistrict"}
                title={"District Masters"}
              />
              <CustomLink
                to={"/substations"}
                activeLink={"/AddSubstation"}
                title={"Substation Masters"}
              />
              <CustomLink
                to={"/incomingFeederMasterData"}
                activeLink={"/AddIncomingFeederMasterData"}
                title={"Incomming Feeder Master data"}
              />
              <CustomLink
                to={"/outgoingFeederMaterData"}
                activeLink={"/AddOutgoingFeederMasterData"}
                title={"Outgoing Feeder Master data"}
              />
              <CustomLink
                to={"/kv33ConsumerFeederMaster"}
                activeLink={"/AddKV33ConsumerFeederData"}
                title={"33 KV & Above Consumer Master"}
              />
              <CustomLink to={"/transformer"} title={"Transformer Master"} />
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
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Distribution - Transaction
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <CustomLink
                to={"/AddTransactionStatusByAdmin"}
                title={"Add Substation Metering Status By Admin"}
              />
              <CustomLink
                to={"/EditTransactionStatusByAdmin"}
                title={"Edit Substation Metering Status By Admin"}
              />
              <CustomLink
                to={"/Add33KVStatusByAdmin"}
                title={
                  "Add 33KV & Above Consumer Feeder Metering Status By Admin"
                }
              />
              <CustomLink
                to={"/Edit33KVStatusByAdmin"}
                title={
                  "Edit 33KV & Above Consumer Feeder Metering Status By Admin"
                }
              />
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
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
                Distribution Report
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <CustomLink
                to={"/substation-metering-status-report"}
                title={"Substation Metering Status Report"}
              />
              <CustomLink
                to={"/monthly-line-loss-report"}
                title={"Monthly Line Loss Report"}
              />
              <CustomLink
                to={"/division-wise-line-loss-report"}
                title={"Line Loss Report (Independent Feeders)"}
              />
              <CustomLink
                to={"/division-wise-independent-feeder-metering-status-report"}
                title={
                  "Sub-Station Metering Status Report (Independent Feeder)"
                }
              />
              <CustomLink
                to={"/substation-energy-receipt"}
                title={"Substation Energy Receipt Month Wise"}
              />
              <CustomLink
                to={"/33kv-above-feeder-master-energy-receipt"}
                title={"33KV & Above Energy Receipt Month Wise"}
              />
              <CustomLink
                to={"/master-substation-with-bay-point"}
                title={"Substation Master With Feeder Bay Point"}
              />
              <CustomLink
                to={"/33kv-master-bay-point"}
                title={"33KV & Above Feeder With Bay Point"}
              />
              <CustomLink
                to={"/distribution-transmission-transaction"}
                title={"Distribution and Transmission Transaction Month Wise"}
              />
            </List>
          </AccordionBody>
        </Accordion>
        <NavLink to="/TransMisstionDashboard">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            Transmission Dashboard
          </ListItem>
        </NavLink>

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
                Transmission Master
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <CustomLink
                to={"/SubstationDataList"}
                activeLink={"/AddSubstationData"}
                title={"Name Of Substation"}
              />
              <CustomLink
                to={"/FeederBayDataList"}
                activeLink={"/AddFeederBayData"}
                title={"Name Of Feeder/Bay"}
              />
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 6}
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
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Transmission Transaction
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0"></List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
