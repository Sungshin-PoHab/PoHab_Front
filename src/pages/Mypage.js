import React, { useState, useEffect } from 'react';
import instance from '../utils/axiosConfig';

import TopBar from '../components/Main/TopBar';
import Guideline from '../components/Main/Guideline';
import Guideline2 from '../components/Main/Guideline2';
import '../assets/Main/Main.css';
import '../assets/Main/Mypage.css';

function Mypage() {
  const [myData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authorization = window.localStorage.getItem('authorization');

  const getData = async () => {
    try {
      setData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get('http://localhost:8787/main', {
        headers: {
           authorization: authorization,
        },
      });
      setData(res.data);
      console.log('res ', res);
    } catch (e) {
        alert('로그인 해주세요');
        window.location.href=`http://localhost:5000/login`;
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!myData) return null;

  return (
    <div>
      <TopBar />
      <div className='z-main-div'>
          <Guideline />
          <Guideline2 />
      </div>
    </div>
  );
}

export default Mypage;
