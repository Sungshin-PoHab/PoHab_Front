import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ApplyStatusTable from "../components/ApplyStatusForStaff/ApplyStatustable";
import ApplyStatus from "../components/ApplyStatusForStaff/ApplyStatus";

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
      const res = await axios.get(`http://localhost:8787/apply/forStaff/${params.department}/${params.step}`, {
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

  return (
    <div className="wrap_div">
      <ApplyStatus applicantNum={ applyData.applicantNum } 
      competition={ applyData.competition } department={ applyData.department} 
      party={ applyData.party } step={ applyData.step }/>
      <ApplyStatusTable applicants={ applyData.applicantDtoList } />
    </div>
  );
}

export default ApplyStatusForStaff;
