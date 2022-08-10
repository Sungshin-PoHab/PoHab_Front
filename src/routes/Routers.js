import { Route, Routes } from "react-router-dom";
import Hello from "../components/Hello";
import Auth from "../pages/Auth";
import Login from "../pages/Login";
import Oauth from "../components/OAuth";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/hello" element={Auth(Hello, true)} />
        <Route path="/login" element={Auth(Login, null)} />
        <Route path="/oauth" element={Auth(Oauth, null)} />
      </Routes>
    </div>
  );
}

export default Routers;
