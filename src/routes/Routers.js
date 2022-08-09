import { Route, Routes } from "react-router-dom";
import Hello from "../components/Hello";
import PartyEnrollPage from "../pages/PartyEnroll";
import CodePage from "../pages/PartyCode";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/party/enroll" element={<PartyEnrollPage />} />
        <Route path="/party/:code" element={<CodePage />} />
      </Routes>
    </div>
  );
}

export default Routers;
