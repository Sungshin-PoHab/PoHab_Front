import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';

function ApplyQuestions() {
  const departmentId = useParams().department;

  const [applyData, setApplyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setApplyData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get(`/question/?department=${departmentId}`);
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
    <div>
      <h2>
        {applyData[0].department.party.name} 동아리{' '}
        {applyData[0].department.party.id.split('-')[1]}기 신입 리크루팅
      </h2>
    </div>
  );
}

export default ApplyQuestions;
