import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import GradingTable from "../components/GradingStatusForStaff/GradingTable";
import Result from "../components/GradingStatusForStaff/Result";
import Guideline from "../components/GradingStatusForStaff/Guideline";

function GradingStatusForStaff() {

  const [gradingData, setApplyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  let params = useParams();

  // const authorization = window.localStorage.getItem('authorization');
  const getData = async () => {
    try {
      setApplyData(null);
      setError(null);
      setLoading(true);
      const res = await axios.get(`http://localhost:8787/grading/announcePNP/${params.department}/${params.step}`, {
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
  if (!gradingData) return null;

  return (
    <div className="wrap_div">
      <Guideline />
      <GradingTable applicantGradingDtoList={ gradingData.applicantGradingDtoList }/> 
      <Result overallAvg={ gradingData.overallAvg }
      highScore={ gradingData.highScore } lowestScore={ gradingData.lowestScore }/>
    </div>
  );
}

export default GradingStatusForStaff;
