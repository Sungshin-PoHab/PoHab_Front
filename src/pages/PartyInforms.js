import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../utils/axiosConfig';

import '../assets/PartyEnroll/PartyCode.css';

function PartyInformsPage(props) {

  let params = useParams();

<<<<<<< HEAD
<<<<<<< Updated upstream
  const partyId = encodeURI(encodeURIComponent(params.party));
=======
  const partyId = params.party;
>>>>>>> Stashed changes
=======
  const partyId = params.party;
>>>>>>> fix/must_merge
  
  const [department, setDepartment] = useState(null);
  const [step, setStep] = useState(null);
  const [error, setError] = useState(false);

  const getDepartment = async () => {
   try {
     setDepartment(null);
     console.log(params.party);
<<<<<<< HEAD
<<<<<<< Updated upstream
     const res = await instance.get('/department/' + '포합-1', {
       headers: {
       },
     });
     setDepartment(res.data);
     console.log('department is ', res);
=======
=======
>>>>>>> fix/must_merge
     const res = await instance.get(`/department/common/${params.party}`, {
       headers: {
       },
     });
     setDepartment(res.data.id);
     console.log(res.data);
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> fix/must_merge
   } catch (e) {
       setError(e);
   }
  };

  const getStep = async () => {
   try {
     setStep(null);
     const res = await instance.get(`/recruit/step/first/${params.party}`, {
       headers: {
       },
     });
<<<<<<< HEAD
<<<<<<< Updated upstream
     setStep(res.data);
     console.log('step is ', res);
=======
     setStep(res.data.id);
>>>>>>> Stashed changes
=======
     setStep(res.data.id);
>>>>>>> fix/must_merge
   } catch (e) {
       setError(e);
   }
  };

  useEffect(() => {
    getDepartment();
    getStep();
  }, []);
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> fix/must_merge

  const applyStatus = () => {
    window.location.href = `/apply/forStaff/${department}/${step}`;
  }
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> fix/must_merge

  return (
    <div class="J_wrap_div">
      <div class="J_title">
        <h1>{partyId} 동아리 페이지</h1>
        동아리 모집에 필요한 정보를 등록 및 확인할 수 있는 페이지입니다.
      </div>
      <div class="J_button_div">
        <button
          class="J_partyInforms_btn J_copy_btton"
          style={{ 'margin-bottom': 60 }}
          id="J_copy_btton"
          onClick={() => (window.location.href = `/apply/forStaff/${department}/${step}`)} >
          모집 현황 확인하기
        </button>
        <button
          class="J_partyInforms_btn J_copy_btton"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/staff/read/${partyId}`)}
        >
          운영진 확인/등록하기
        </button>
        <button
          class="J_partyInforms_btn J_copy_btton"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/recruit/department/${partyId}`)}
        >
          모집 정보 확인/등록하기
        </button>
        <button
          class="J_partyInforms_btn J_copy_btton"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/question/create/${partyId}`)}
        >
          지원서 양식 확인/등록하기
        </button>
        <button
          class="J_partyInforms_btn J_copy_btton"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/grading/standard/read/${partyId}/${step}`)}
        >
          채점 기준 확인/등록하기
        </button>
      </div>
    </div>
  );
}

export default PartyInformsPage;
