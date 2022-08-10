import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth(SpecificComponent, option) {
  const navigate = useNavigate();

  const userEmail = window.localStorage.getItem("userEmail");

  if (option) {
    if (!userEmail) {
      navigate("/login");
    }
  }

  return <SpecificComponent />;
}

export default Auth;
