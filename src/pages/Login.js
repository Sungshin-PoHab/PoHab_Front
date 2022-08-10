import React from "react";

const API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = "http://localhost:3000/oauth";

function Login() {
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="loginButton" style={{ width: "50vw", height: "10vh" }}>
      <a
        alt="카카오로 로그인하기"
        href={KAKAO_AUTH_URI}
        style={{ color: "black" }}
      >
        카카오톡으로 로그인하기
      </a>
    </div>
  );
}

export default Login;
