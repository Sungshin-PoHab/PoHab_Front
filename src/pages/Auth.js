import React from 'react';
import { useNavigate } from 'react-router-dom';

function Auth(SpecificComponent, option) {
  const navigate = useNavigate();

  const authorization = window.localStorage.getItem('authorization');

  if (option) {
    if (!authorization) {
      navigate('/login');
    } else {
    }
  }

  return <SpecificComponent />;
}

export default Auth;
