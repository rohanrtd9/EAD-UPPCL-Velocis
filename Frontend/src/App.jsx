import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import Dashboard from "./pages/private/dashboard";
import Shimmer from "./component/Shimmer";
import React, { Suspense } from "react";
const ZoneList = React.lazy(() => import("./pages/private/Zone/zoneList"));
const AddZone = React.lazy(() => import("./pages/private/Zone/addZone"));
const AddCircle = React.lazy(() => import("./pages/private/Circle/addCircle"));
const CircleList = React.lazy(() =>
  import("./pages/private/Circle/circleList")
);
const DivisionList = React.lazy(() =>
  import("./pages/private/Division/divisionList")
);
const AddDivision = React.lazy(() =>
  import("./pages/private/Division/addDivision")
);
const DistrictList = React.lazy(() =>
  import("./pages/private/District/districtList")
);
const AddDistrict = React.lazy(() =>
  import("./pages/private/District/addDistrict")
);
const TransformerList = React.lazy(() =>
  import("./pages/private/Transformer/TransformerList")
);
const SubstationList = React.lazy(() =>
  import("./pages/private/Substation/SubstationList")
);
const AddSubstation = React.lazy(() =>
  import("./pages/private/Substation/AddSubstation")
);
const IncomingFeederMasterData = React.lazy(() =>
  import("./pages/private/IncomingFeederData/IncomingFeederMasterData")
);

const AddIncomingFeederMasterData = React.lazy(() =>
  import("./pages/private/IncomingFeederData/AddIncomingFeederMasterData")
);
const OutgoingFeederMasterData = React.lazy(() =>
  import("./pages/private/OutgoingFeederData/OutgoingFeederMasterData")
);
const AddOutgoingFeederMasterData = React.lazy(() =>
  import("./pages/private/OutgoingFeederData/AddOutgoingFeederMasterData")
);
const KV33ConsumerFeederData = React.lazy(() =>
  import("./pages/private/KV33ConsumerFeederData/KV33ConsumerFeederData")
);
const SubstationMeteringStatusReport = React.lazy(() =>
  import("./pages/private/Report/SubstationMeteringStatusReport")
);
const MonthlyLineLossReport = React.lazy(() =>
  import("./pages/private/Report/MonthlyLineLossReport")
);
const DivisionWiseLineLossReport = React.lazy(() =>
  import("./pages/private/Report/DivisionWiseLineLossReport")
);
const DivisionWiseIndependentFeederMeteringStatusReport = React.lazy(() =>
  import(
    "./pages/private/Report/DivisionWiseIndependentFeederMeteringStatusReport"
  )
);
const SubstationEnergyReceipt = React.lazy(() =>
  import("./pages/private/Report/SubstationEnergyReceipt")
);
const KV33AboveFeederMasterEnergyReceipt = React.lazy(() =>
  import("./pages/private/Report/KV33AboveFeederMasterEnergyReceipt")
);
const MasterSubstationWithBayPoint = React.lazy(() =>
  import("./pages/private/Report/MasterSubstationWithBayPoint")
);
const KV33MasterBayPoint = React.lazy(() =>
  import("./pages/private/Report/KV33MasterBayPoint")
);
const DistributionTransmissionTransaction = React.lazy(() =>
  import("./pages/private/Report/DistributionTransmissionTransaction")
);
const Error404 = React.lazy(() => import("./pages/private/Error/404"));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/zone"
            element={
              <Suspense fallback={<Shimmer />}>
                <ZoneList />
              </Suspense>
            }
          />
          <Route
            path="/addZone"
            element={
              <Suspense fallback={<Shimmer />}>
                <AddZone />
              </Suspense>
            }
          />
          <Route
            path="/circle"
            element={
              <Suspense fallback={<Shimmer />}>
                <CircleList />
              </Suspense>
            }
          />
          <Route
            path="/addCircle"
            element={
              <Suspense fallback={<Shimmer />}>
                <AddCircle />
              </Suspense>
            }
          />
          {/* Disivion Route  */}
          <Route
            path="/division"
            element={
              <Suspense fallback={<Shimmer />}>
                <DivisionList />
              </Suspense>
            }
          />
          <Route
            path="/addDivision"
            element={
              <Suspense fallback={<Shimmer />}>
                <AddDivision />
              </Suspense>
            }
          />
          {/* District Route  */}
          <Route
            path="/district"
            element={
              <Suspense fallback={<Shimmer />}>
                <DistrictList />
              </Suspense>
            }
          />
          <Route
            path="/addDistrict"
            element={
              <Suspense fallback={<Shimmer />}>
                <AddDistrict />
              </Suspense>
            }
          />
          <Route
            path="/transformer"
            element={
              <Suspense fallback={<Shimmer />}>
                <TransformerList />
              </Suspense>
            }
          />
          {/* Substation Master */}
          <Route
            path="/substations"
            element={
              <Suspense fallback={<Shimmer />}>
                <SubstationList />
              </Suspense>
            }
          />
          <Route
            path="/AddSubstation"
            element={
              <Suspense fallback={<Shimmer />}>
                <AddSubstation />
              </Suspense>
            }
          />
          {/* Incoming Feeder Master Data */}
          <Route
            path="/incomingFeederMasterData"
            element={
              <Suspense fallback={<Shimmer />}>
                <IncomingFeederMasterData />
              </Suspense>
            }
          />
          {/* Add Incoming Feeder Master Data */}
          <Route
            path="/AddIncomingFeederMasterData"
            element={
              <Suspense fallback={<Shimmer />}>
                <AddIncomingFeederMasterData />
              </Suspense>
            }
          />
          {/* Outgoing Feeder Master Data */}
          <Route
            path="/outgoingFeederMaterData"
            element={
              <Suspense fallback={<Shimmer />}>
                <OutgoingFeederMasterData />
              </Suspense>
            }
          />
          {/* Add Outgoing Feeder Master Data */}
          <Route
            path="/AddOutgoingFeederMasterData"
            element={
              <Suspense fallback={<Shimmer />}>
                <AddOutgoingFeederMasterData />
              </Suspense>
            }
          />

          {/* 33KV & Above Consumer Feeder Master */}
          <Route
            path="/kv33ConsumerFeederMaster"
            element={
              <Suspense fallback={<Shimmer />}>
                <KV33ConsumerFeederData />
              </Suspense>
            }
          />
          {/* Reports */}
          <Route
            path="/substation-metering-status-report"
            element={
              <Suspense fallback={<Shimmer />}>
                <SubstationMeteringStatusReport />
              </Suspense>
            }
          />
          <Route
            path="/monthly-line-loss-report"
            element={
              <Suspense fallback={<Shimmer />}>
                <MonthlyLineLossReport />
              </Suspense>
            }
          />
          <Route
            path="/division-wise-line-loss-report"
            element={
              <Suspense fallback={<Shimmer />}>
                <DivisionWiseLineLossReport />
              </Suspense>
            }
          />
          <Route
            path="/division-wise-independent-feeder-metering-status-report"
            element={
              <Suspense fallback={<Shimmer />}>
                <DivisionWiseIndependentFeederMeteringStatusReport />
              </Suspense>
            }
          />
          <Route
            path="/substation-energy-receipt"
            element={
              <Suspense fallback={<Shimmer />}>
                <SubstationEnergyReceipt />
              </Suspense>
            }
          />
          <Route
            path="/33kv-above-feeder-master-energy-receipt"
            element={
              <Suspense fallback={<Shimmer />}>
                <KV33AboveFeederMasterEnergyReceipt />
              </Suspense>
            }
          />
          <Route
            path="master-substation-with-bay-point"
            element={
              <Suspense fallback={<Shimmer />}>
                <MasterSubstationWithBayPoint />
              </Suspense>
            }
          />
          <Route
            path="33kv-master-bay-point"
            element={
              <Suspense fallback={<Shimmer />}>
                <KV33MasterBayPoint />
              </Suspense>
            }
          />
          <Route
            path="distribution-transmission-transaction"
            element={
              <Suspense fallback={<Shimmer />}>
                <DistributionTransmissionTransaction />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Shimmer />}>
                <Error404 />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
