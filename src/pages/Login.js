import React from 'react';
import Logo from '../components/login/Logo'

const API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = 'http://localhost:3000/oauth';

function Login() {
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="z-div">
      <Logo />
      <div className='z-login-div'>
        <a href={KAKAO_AUTH_URI} className='z-login-a'>
          카카오톡으로 로그인하기
        </a>
      </div>
    </div>
  );
}

export default Login;
