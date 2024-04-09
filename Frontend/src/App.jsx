import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import Dashboard from "./pages/private/dashboard";
import ZoneList from "./pages/private/Zone/zoneList";
import AddZone from "./pages/private/Zone/addZone";
import AddCircle from "./pages/private/Circle/addCircle";
import CircleList from "./pages/private/Circle/circleList";

import DivisionList from "./pages/private/Division/divisionList";
import AddDivision from "./pages/private/Division/addDivision";
import DistrictList from "./pages/private/District/districtList";
import AddDistrict from "./pages/private/District/addDistrict";

import TransformerList from "./pages/private/Transformer/TransformerList";
import SubstationList from "./pages/private/Substation/SubstationList";
import AddSubstation from "./pages/private/Substation/AddSubstation";
import IncomingFeederMasterData from "./pages/private/IncomingFeederData/IncomingFeederMasterData";
import OutgoingFeederMasterData from "./pages/private/OutgoingFeederData/OutgoingFeederMasterData";
import KV33ConsumerFeederData from "./pages/private/KV33ConsumerFeederData/KV33ConsumerFeederData";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/zone" element={<ZoneList />} />
          <Route path="/addZone" element={<AddZone />} />
          <Route path="/circle" element={<CircleList />} />

          <Route path="/addCircle" element={<AddCircle />} />
          {/* Disivion Route  */}
          <Route path="/division" element={<DivisionList />} />
          <Route path="/addDivision" element={<AddDivision />} />

          {/* District Route  */}
          <Route path="/district" element={<DistrictList />} />
          <Route path="/addDistrict" element={<AddDistrict />} />

          <Route path="/transformer" element={<TransformerList />} />

          {/* Substation Master */}
          <Route path="/substations" element={<SubstationList />} />
          <Route path="/AddSubstation" element={<AddSubstation />} />

          {/* Incoming Feeder Master Data */}
          <Route
            path="/incomingFeederMasterData"
            element={<IncomingFeederMasterData />}
          />
          {/* Outgoing Feeder Master Data */}
          <Route
            path="/outgoingFeederMaterData"
            element={<OutgoingFeederMasterData />}
          />

          {/* 33KV & Above Consumer Feeder Master */}
          <Route
            path="/kv33ConsumerFeederMaster"
            element={<KV33ConsumerFeederData />}
          />

          <Route path="*" element={<p>404</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
