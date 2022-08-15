import React, { useState, useEffect } from 'react';
import instance from '../utils/axiosConfig'
import { useParams } from 'react-router-dom';

import ApplyStatus from '../components/ApplyStatusForStaff/ApplyStatus';
import Buttons from '../components/ApplyStatusForStaff/Buttons';

function ApplyStatusForStaff() {

  const [applyData, setApplyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  let params = useParams();

  // const authorization = window.localStorage.getItem('authorization');
  const getData = async () => {
    try {
      setApplyData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get(`http://localhost:8787/apply/forStaff/${params.department}/${params.step}`, {
        headers: {
          // authorization: authorization,
        },
      });
      setApplyData(res.data);
      console.log('res ', res);
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!applyData) return null;

  console.log(applyData.applicantDtoList);

  return (
    <div className="z-wrap-div">
      <ApplyStatus applyData={ applyData } />
      <Buttons />
    </div>
  );
}

export default ApplyStatusForStaff;
