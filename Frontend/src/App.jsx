import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import Dashboard from "./pages/private/dashboard";
import ZoneList from "./pages/private/Zone/zoneList";
import AddZone from "./pages/private/Zone/addZone";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/zone" element={<ZoneList />} />
          <Route path="/addZone" element={<AddZone />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
