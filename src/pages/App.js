import React from "react";
import { Routes, Route } from "react-router-dom";

import Hello from "../components/Hello";
import Home from "./Home";
import Login from "./Login";
import Oauth from "../components/OAuth";
import Auth from "./Auth";

function App() {
  return (
    // <div>
    //   <Hello />
    // </div>
    <Routes>
      <Route path="/" element={Auth(Home, true)} />
      <Route path="/hello" element={Auth(Hello, true)} />
      <Route path="/login" element={Auth(Login, null)} />
      <Route path="/oauth" element={Auth(Oauth, null)} />
    </Routes>
  );
}

export default App;
