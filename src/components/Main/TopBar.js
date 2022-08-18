import React, { useState, useEffect } from 'react';

import MainAuth from '../../pages/MainAuth';
import logoPng from '../../assets/Login/LogoPng.png';
import '../../assets/Main/TopBar.css';

function TopBar(props) {
  const [auth, setAuth] = useState(true);
  const [id, setId] = useState(null);

  const loginFunc = () => {
    let authorization = window.localStorage.getItem('authorization');
    var jsonPayload;
    const tf = MainAuth(authorization, true);
    if (tf == true) {
      //로그인 됐을 때
      authorization = authorization.substring(4);
      var base64Url = authorization.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      setId((id) => jsonPayload);
    }
    setAuth(tf);
  };

  useEffect(() => {
    loginFunc();
  }, []);

  return (
    <div>
      <nav id="nav3">
        <a href="#">
          <img className="z-top-img" src={logoPng} />
        </a>
        <ul>
          <li>
            <a
              href="http://frontserver:5000/main"
              style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
            >
              모집 공고 보기
            </a>
          </li>
          <li>
            <a
              href="http://frontserver:5000/user/myApply"
              style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
            >
              내 지원 목록 확인
            </a>
          </li>
          {auth == true ? (
            <li>
              <a
                href="http://frontserver:5000/mypage"
                style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
              >
                마이페이지
              </a>
            </li>
          ) : (
            <li>
              <a
                href="http://frontserver:5000/login"
                style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
              >
                로그인 해주세요
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default TopBar;
