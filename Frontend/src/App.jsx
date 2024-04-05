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

          <Route path="/division" element={<DivisionList />} />
          <Route path="/addDivision" element={<AddDivision />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
