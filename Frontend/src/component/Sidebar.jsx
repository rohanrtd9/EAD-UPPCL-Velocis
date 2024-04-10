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

export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const { pathname } = useLocation();
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
            Dashboard
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
                Masters
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <NavLink
                to="/zone"
                className={pathname === "/addZone" && "active"}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Zone Masters{console.log(pathname)}
                </ListItem>
              </NavLink>

              <NavLink
                to="/circle"
                className={pathname === "/addCircle" && "active"}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Circle Masters
                </ListItem>
              </NavLink>

              <NavLink
                to="/division"
                className={pathname === "/addDivision" && "active"}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Division Masters
                </ListItem>
              </NavLink>

              <NavLink
                to="/district"
                className={pathname === "/addDistrict" && "active"}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  District Masters
                </ListItem>
              </NavLink>

              <NavLink
                to="/substations"
                className={pathname === "/AddSubstation" && "active"}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Substation Masters
                </ListItem>
              </NavLink>

              <NavLink to="/incomingFeederMasterData">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Incomming Feeder Master data
                </ListItem>
              </NavLink>

              <NavLink to="/outgoingFeederMaterData">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Outgoing Feeder Master data
                </ListItem>
              </NavLink>

              <NavLink to="/kv33ConsumerFeederMaster">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  33 KV & above consumer master
                </ListItem>
              </NavLink>

              <NavLink to="/transformer">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Transformer master
                </ListItem>
              </NavLink>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem>
          <ListItemPrefix>
            <BoltIcon className="h-5 w-5" />
          </ListItemPrefix>
          Transactions
        </ListItem>
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
                Report
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <NavLink to={"/substation-metering-status-report"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Substation Metering Status Report
                </ListItem>
              </NavLink>
              <NavLink to={"/monthly-line-loss-report"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Monthly Line Loss Report
                </ListItem>
              </NavLink>

              <NavLink to={"/division-wise-line-loss-report"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Line Loss Report (Independent Feeders)
                </ListItem>
              </NavLink>
              <NavLink
                to={"division-wise-independent-feeder-metering-status-report"}
              >
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Sub-Station Metering Status Report (Independent Feeder)
                </ListItem>
              </NavLink>
              <NavLink to={"/substation-energy-receipt"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Substation Energy Receipt Month Wise
                </ListItem>
              </NavLink>
              <NavLink to={"/33kv-above-feeder-master-energy-receipt"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  33KV & Above Energy Receipt Month Wise
                </ListItem>
              </NavLink>
              <NavLink to={"/master-substation-with-bay-point"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Substation Master With Feeder Bay Point
                </ListItem>
              </NavLink>
              <NavLink to={"/33kv-master-bay-point"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  33KV & Above Feeder With Bay Point
                </ListItem>
              </NavLink>
              <NavLink to={"/distribution-transmission-transaction"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Distribution and Transmission Transaction Month Wise
                </ListItem>
              </NavLink>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
