import React, { useState, useEffect } from 'react';
import instance from '../utils/axiosConfig';

import RecruitmentBlock from '../components/Main/RecruitmentBlock';
import '../assets/Main/Main.css';

function Home() {

  const [mainData, setMainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setMainData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get('http://localhost:8787/main', {
        headers: {
        },
      });
      setMainData(res.data);
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
  if (!mainData) return null;

  let odd = 'odd';
  let key = 1;

  return (
    <div className="wrap_div">
      <h4>최근에 올라온 모집 공고</h4>
        {mainData.map(data => (
          <RecruitmentBlock party={data.party} competition={data.competition} 
            stepDateDtos={data.stepDateDtos} department={data.department} availability={data.availability} isOddNum={odd+(key++%2)}/>
        ))}
         

    </div>
  );
}

export default Home;
