import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import TransMisstionDashboard from "./pages/private/Transmission/dashboard";
import Dashboard from "./pages/private/Distribution/dashboard";
import Shimmer from "./component/Shimmer";
import React, { Suspense } from "react";
import { AppProvider } from "./utils/userContext";

const ZoneList = React.lazy(() =>
  import("./pages/private/Distribution/Zone/zoneList")
);
const AddZone = React.lazy(() =>
  import("./pages/private/Distribution/Zone/addZone")
);
const AddCircle = React.lazy(() =>
  import("./pages/private/Distribution/Circle/addCircle")
);
const CircleList = React.lazy(() =>
  import("./pages/private/Distribution/Circle/circleList")
);
const DivisionList = React.lazy(() =>
  import("./pages/private/Distribution/Division/divisionList")
);
const AddDivision = React.lazy(() =>
  import("./pages/private/Distribution/Division/addDivision")
);
const DistrictList = React.lazy(() =>
  import("./pages/private/Distribution/District/districtList")
);
const AddDistrict = React.lazy(() =>
  import("./pages/private/Distribution/District/addDistrict")
);
const TransformerList = React.lazy(() =>
  import("./pages/private/Distribution/Transformer/TransformerList")
);
const SubstationList = React.lazy(() =>
  import("./pages/private/Distribution/Substation/SubstationList")
);
const AddSubstation = React.lazy(() =>
  import("./pages/private/Distribution/Substation/AddSubstation")
);
const IncomingFeederMasterData = React.lazy(() =>
  import(
    "./pages/private/Distribution/IncomingFeederData/IncomingFeederMasterData"
  )
);

const AddIncomingFeederMasterData = React.lazy(() =>
  import(
    "./pages/private/Distribution/IncomingFeederData/AddIncomingFeederMasterData"
  )
);
const OutgoingFeederMasterData = React.lazy(() =>
  import(
    "./pages/private/Distribution/OutgoingFeederData/OutgoingFeederMasterData"
  )
);
const AddOutgoingFeederMasterData = React.lazy(() =>
  import(
    "./pages/private/Distribution/OutgoingFeederData/AddOutgoingFeederMasterData"
  )
);
const KV33ConsumerFeederData = React.lazy(() =>
  import(
    "./pages/private/Distribution/KV33ConsumerFeederData/KV33ConsumerFeederData"
  )
);

const AddKV33ConsumerFeederData = React.lazy(() =>
  import(
    "./pages/private/Distribution/KV33ConsumerFeederData/AddKV33ConsumerFeederData"
  )
);

// Start Login

const Login = React.lazy(() => import("./pages/public/Login"));

// Distribution Trasaction route here

const AddTransactionStatusByAdmin = React.lazy(() =>
  import("./pages/private/Distribution/Transaction/AddTransactionStatusByAdmin")
);

const EditTransactionStatusByAdmin = React.lazy(() =>
  import(
    "./pages/private/Distribution/Transaction/EditTransactionStatusByAdmin"
  )
);

const Add33KVStatusByAdmin = React.lazy(() =>
  import("./pages/private/Distribution/Transaction/Add33KVStatusByAdmin")
);

const Edit33KVStatusByAdmin = React.lazy(() =>
  import("./pages/private/Distribution/Transaction/Edit33KVStatusByAdmin")
);

// Transmission Tabs Here

const AddFeederBayData = React.lazy(() =>
  import("./pages/private/Transmission/FeederBay/AddFeederBayData")
);

const ZoneTransmission = React.lazy(() =>
  import("./pages/private/Transmission/Zone/zoneTranmissionList")
);

const CircleTransmission = React.lazy(() =>
  import("./pages/private/Transmission/Circle/circleList")
);

const DivisionTransmission = React.lazy(() =>
  import("./pages/private/Transmission/Division/divisionList")
);

const AddDivisionTransmission = React.lazy(() =>
  import("./pages/private/Transmission/Division/addDivision")
);

const AddDistrictTransmission = React.lazy(() =>
  import("./pages/private/Transmission/District/addDistrict")
);

const DistrictTransmission = React.lazy(() =>
  import("./pages/private/Transmission/District/districtList")
);

const AddCircleTransmission = React.lazy(() =>
  import("./pages/private/Transmission/Circle/addCircle")
);

const AddZoneTransmission = React.lazy(() =>
  import("./pages/private/Transmission/Zone/AddZoneTransmission")
);

const FeederBayDataList = React.lazy(() =>
  import("./pages/private/Transmission/FeederBay/FeederBayDataList")
);

const AddSubstationData = React.lazy(() =>
  import("./pages/private/Transmission/SubStation/AddSubstationData")
);

const SubstationDataList = React.lazy(() =>
  import("./pages/private/Transmission/SubStation/SubstationDataList")
);

const SubstationMeteringStatusReport = React.lazy(() =>
  import("./pages/private/Distribution/Report/SubstationMeteringStatusReport")
);

// Transmission Report Route Here BY ADARSH

const MasterDataReport = React.lazy(() =>
  import("./pages/private/Transmission/Report/MasterDataReport")
);

const MonthlyEnergyReport = React.lazy(() =>
  import("./pages/private/Transmission/Report/MonthlyEnergyReport")
);

const MonthlyEnergyReportTD = React.lazy(() =>
  import("./pages/private/Transmission/Report/MonthlyEnergyReportTD")
);

const MonthlyLineLossReport = React.lazy(() =>
  import("./pages/private/Distribution/Report/MonthlyLineLossReport")
);
const DivisionWiseLineLossReport = React.lazy(() =>
  import("./pages/private/Distribution/Report/DivisionWiseLineLossReport")
);
const DivisionWiseIndependentFeederMeteringStatusReport = React.lazy(() =>
  import(
    "./pages/private/Distribution/Report/DivisionWiseIndependentFeederMeteringStatusReport"
  )
);
const SubstationEnergyReceipt = React.lazy(() =>
  import("./pages/private/Distribution/Report/SubstationEnergyReceipt")
);
const KV33AboveFeederMasterEnergyReceipt = React.lazy(() =>
  import(
    "./pages/private/Distribution/Report/KV33AboveFeederMasterEnergyReceipt"
  )
);
const MasterSubstationWithBayPoint = React.lazy(() =>
  import("./pages/private/Distribution/Report/MasterSubstationWithBayPoint")
);
const KV33MasterBayPoint = React.lazy(() =>
  import("./pages/private/Distribution/Report/KV33MasterBayPoint")
);

const DistributionTransmissionTransaction = React.lazy(() =>
  import(
    "./pages/private/Distribution/Report/DistributionTransmissionTransaction"
  )
);
const Error404 = React.lazy(() => import("./pages/private/Error/404"));

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/TransMisstionDashboard"
              element={<TransMisstionDashboard />}
            />
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
              path="/zoneAction/:pageName"
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
              path="/circleAction/:pageName"
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
              path="/divisionAction/:pageName"
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
              path="/districtAction/:pageName"
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
              path="/substationAction/:pageName"
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
              path="/incomingFeederAction/:pageName"
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
              path="/outgoingFeederAction/:pageName"
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
            <Route
              path="/outgoingFeeder33KVAction/:pageName"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddKV33ConsumerFeederData />
                </Suspense>
              }
            />
            {/* Distribution Transaction Route Here */}
            <Route
              path="/AddTransactionStatusByAdmin"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddTransactionStatusByAdmin />
                </Suspense>
              }
            />
            <Route
              path="/EditTransactionStatusByAdmin"
              element={
                <Suspense fallback={<Shimmer />}>
                  <EditTransactionStatusByAdmin />
                </Suspense>
              }
            />
            <Route
              path="/Add33KVStatusByAdmin"
              element={
                <Suspense fallback={<Shimmer />}>
                  <Add33KVStatusByAdmin />
                </Suspense>
              }
            />
            <Route
              path="/Edit33KVStatusByAdmin"
              element={
                <Suspense fallback={<Shimmer />}>
                  <Edit33KVStatusByAdmin />
                </Suspense>
              }
            />
            {/* Transmission master */}
            <Route
              path="/zoneTranmissionList"
              element={
                <Suspense fallback={<Shimmer />}>
                  <ZoneTransmission />
                </Suspense>
              }
            />
            <Route
              path="/zoneTransmissionAction/:pageName"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddZoneTransmission />
                </Suspense>
              }
            />
            <Route
              path="/circleTransmission"
              element={
                <Suspense fallback={<Shimmer />}>
                  <CircleTransmission />
                </Suspense>
              }
            />
            <Route
              path="/circleTransmissionAction/:pageName"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddCircleTransmission />
                </Suspense>
              }
            />
            <Route
              path="/divisionTransmission"
              element={
                <Suspense fallback={<Shimmer />}>
                  <DivisionTransmission />
                </Suspense>
              }
            />
            <Route
              path="/divisionTransmissionAction/:pageName"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddDivisionTransmission />
                </Suspense>
              }
            />
            <Route
              path="/districtTransmission"
              element={
                <Suspense fallback={<Shimmer />}>
                  <DistrictTransmission />
                </Suspense>
              }
            />
            <Route
              path="/districtTransmissionAction/:pageName"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddDistrictTransmission />
                </Suspense>
              }
            />
            <Route
              path="/FeederBayDataList"
              element={
                <Suspense fallback={<Shimmer />}>
                  <FeederBayDataList />
                </Suspense>
              }
            />
            <Route
              path="/feederBayTransmissionAction/:pageName"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddFeederBayData />
                </Suspense>
              }
            />
            <Route
              path="/SubstationDataList"
              element={
                <Suspense fallback={<Shimmer />}>
                  <SubstationDataList />
                </Suspense>
              }
            />
            <Route
              path="/subStationTransmissionAction/:pageName"
              element={
                <Suspense fallback={<Shimmer />}>
                  <AddSubstationData />
                </Suspense>
              }
            />
            {/* Transmission Report */}
            <Route
              path="/MasterDataReport"
              element={
                <Suspense fallback={<Shimmer />}>
                  <MasterDataReport />
                </Suspense>
              }
            />
            <Route
              path="/MonthlyEnergyReport"
              element={
                <Suspense fallback={<Shimmer />}>
                  <MonthlyEnergyReport />
                </Suspense>
              }
            />
            <Route
              path="/MonthlyEnergyReportTD"
              element={
                <Suspense fallback={<Shimmer />}>
                  <MonthlyEnergyReportTD />
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
    </AppProvider>
  );
}

export default App;
