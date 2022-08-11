import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';
import CommonQuestions from './CommonQuestions';

function ApplyQuestions() {
  const departmentId = useParams().department;
  const [applyData, setApplyData] = useState(null);
  const [commonData, setCommonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setApplyData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get(`/question/?department=${departmentId}`);
      const partyId = res.data[0].department.party.id;

      const commonDepRes = await instance.get(`/department/${partyId}`);
      const commonDepsId = commonDepRes.data.id;

      const commonQuesRes = await instance.get(
        `/question/?department=${commonDepsId}`
      );
      const commonQues = commonQuesRes.data;
      console.log('commonQuestions: ', commonQues);

      setCommonData(commonQues);
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
      <div>
        <h1>
          {applyData[0].department.party.name} 동아리{' '}
          {applyData[0].department.party.id.split('-')[1]}기 신입 리크루팅
        </h1>
      </div>
      <div>
        <h2>공통 질문</h2>
        {commonData.map((data) => (
          <div>
            <h4>{data.question}</h4>
            <p>최대 {data.maxLength}자</p>
            <textarea rows="20" cols="60" maxLength={data.maxLength}></textarea>
            <br></br>
          </div>
        ))}
      </div>
      <hr></hr>
      <div>
        <h2>부서별 질문</h2>
        {applyData.map((data) => (
          <div>
            <h4>{data.question}</h4>
            <p>최대 {data.maxLength}자</p>
            <textarea
              rows="20"
              cols="60
              "
              maxLength={data.maxLength}
            ></textarea>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplyQuestions;
