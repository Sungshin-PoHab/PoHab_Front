import React, { useState, useEffect } from 'react';
import instance from '../../utils/axiosConfig';

import ApplyTable from './ApplyTable';
import '../../assets/ApplyStatusForStaff/ApplyStatus.css';

function ApplyStatus(props) {

  const [applyData, setApplyData] = useState(props.applyData);

  const departmentClick = async (data, e) => {
    const res = await instance.get(`http://localhost:8787/apply/forStaff/${ data.deId }/${ data.stepId }`, {
      headers: {
        // authorization: authorization,
      },
    });
    console.log(res.data);
    setApplyData(res.data);
  }

  const stepClick = async (data, e) => {
    const res = await instance.get(`http://localhost:8787/apply/forStaff/${ data.deId }/${ data.stepId }`, {
      headers: {
        // authorization: authorization,
      },
    });
    console.log(data.stepId + ' is clicked');
    console.log(res.data);
    setApplyData(res.data);
  }

  return (
      <div className='z-party-div'>
        <h1 className='z-party-h1'>{ applyData.party } </h1>
        <h4 className='z-apply-h4'>지원 현황</h4>

        <h4 className='z-department-h4'>부서</h4>
        <div className='z-de-step-div'>
          { applyData.departmentDtoList.map( data => (
            <button onClick={ (e) => {departmentClick( { deId: data.id, stepId: applyData.stepDtoList[0].id },  e)}}>{ data.department }</button>
          ))}
        </div>

        <h4 className='z-department-h4'>단계</h4>
          <div className='z-de-step-div'>
          { applyData.stepDtoList.map( data => (
            <button onClick={ (e) => {stepClick( { deId: applyData.departmentId, stepId: data.id },  e)}}>{ data.step } 단계</button>
          ))}
        </div>

      <div>
        <h4 className='z-department-h4'>지원 인원</h4>
          현재 <p className='z-applicant-p'>{ applyData.applicantNum }</p>명이 지원 중이에요!  <p className='z-competition-p'>경쟁률 { applyData.competition } : 1</p>
        <h4 className='z-department-h4'>지원 목록</h4>
          지원 순서로 정렬됩니다.
        <div style={{ height: '10px'}}></div>
      </div>
        <ApplyTable applicants={ applyData.applicantDtoList } />
      </div>
  );
}

export default ApplyStatus;