import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainAuth(auth, option) {

  const authorization = window.localStorage.getItem('authorization');

  if (option) {
    if (!authorization) {
      console.log('로그인 하세요');
      return false;
    } else {
      console.log('로그인 되었습니다.');
      return true;
    }
  }
}

export default MainAuth;
