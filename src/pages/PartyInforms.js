import React, { useState, useEffect, useParams } from 'react';
import '../assets/PartyEnroll/PartyCode.css';
import instance from '../utils/axiosConfig';

function PartyInformsPage(props) {
  let params = useParams();

  const partyId = params.party;

  const [department, setDepartment] = useState(null);
  const [step, setStep] = useState(null);
  const [error, setError] = useState(false);

  const getDepartment = async () => {
    try {
      setDepartment(null);
      console.log(params.party);
      const res = await instance.get(`/department/common/${params.party}`, {
        headers: {},
      });
      setDepartment(res.data.id);
      console.log(res.data);
    } catch (e) {
      setError(e);
    }
  };

  const getStep = async () => {
    try {
      setStep(null);
      const res = await instance.get(`/recruit/step/first/${params.party}`, {
        headers: {},
      });
      setStep(res.data.id);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getDepartment();
    getStep();
  }, []);

  const applyStatus = () => {
    window.location.href = `/apply/forStaff/${department}/${step}`;
  };

  const [isQuest, setIsQuest] = useState(null);

  const searchQuest = () => {
    instance.get(`/question/${partyId}`).then((res) => {
      if (res.data == null) {
        setIsQuest(false);
      } else {
        setIsQuest(true);
      }
    });
  };

  const clickHandler = () => {
    if (setIsQuest) {
      window.location.href = `/apply/forStaff/1/1`;
    } else {
      alert('지원서 등록을 먼저 해주세요');
      return;
    }
  };
  useEffect(() => {
    searchQuest();
  }, []);

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
          onClick={() => (window.location.href = `/apply/forStaff/${department}/${step}`)}
        >
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
          onClick={() => (window.location.href = `/recruit/read/${partyId}`)}
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
