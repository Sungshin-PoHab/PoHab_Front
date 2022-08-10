import React from "react";
import { useNavigate } from "react-router-dom";

function Auth(SpecificComponent, option) {
  const navigate = useNavigate();

  const authorization = window.localStorage.getItem("authorization");

  if (option) {
    if (!authorization) {
      navigate("/login");
    } else {
      alert("로그인 완료");
    }
  }

  return <SpecificComponent />;
}

export default Auth;
