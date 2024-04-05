import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import Dashboard from "./pages/private/dashboard";
import ZoneList from "./pages/private/Zone/zoneList";
import AddZone from "./pages/private/Zone/addZone";
import AddCircle from "./pages/private/Circle/addCircle";
import CircleList from "./pages/private/Circle/circleList";

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
