import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Oauth() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    (async () => {
      try {
        console.log("try");
        await axios
          .get(`http://localhost:8787/oauth/token?code=${code}`)
          .then((res) => {
            const authorization = res.headers.authorization;
            window.localStorage.setItem("authorization", authorization);
            console.log(authorization);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${authorization}`;

            navigate("/");
          });
      } catch (e) {
        console.log(e);
        console.error(e);
        window.alert("문제가 발생했습니다. 잠시 후에 다시 시도해주세요.");
        navigate("/login");
      }
    })();
  });

  return <div>로그인 중...</div>;
}

export default Oauth;
