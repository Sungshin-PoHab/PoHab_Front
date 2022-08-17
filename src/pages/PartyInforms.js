import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PartyInformsPage() {
  const params = useParams();
  const partyId = params.party;
  const departmentId = params.department;
  const stepId = params.step;

  return (
    <div class="J_wrap_div">
      <div class="J_title">
        <h1>{partyId} 동아리 페이지</h1>
        동아리 모집에 필요한 정보를 등록 및 확인할 수 있는 페이지입니다.
      </div>
      <div class="J_button_div">
        <button
          class="J_partyInforms_btn"
          style={{ 'margin-bottom': 60 }}
          id="J_copy_btton"
          onClick={() => (window.location.href = '/apply/forStaff/1/1')}
        >
          모집 현황 확인하기
        </button>
        <button
          class="J_partyInforms_btn"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/staff/read/${partyId}`)}
        >
          운영진 확인/등록하기
        </button>
        <button
          class="J_partyInforms_btn"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/recruit/department/${partyId}`)}
        >
          모집 정보 확인/등록하기
        </button>
        <button
          class="J_partyInforms_btn"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/question/create/:party_id`)}
        >
          지원서 양식 확인/등록하기
        </button>
        <button
          class="J_partyInforms_btn"
          id="J_copy_btton"
          onClick={() => (window.location.href = `/grading/standard/create/${partyId}/${stepId}`)}
        >
          채점 기준 확인/등록하기
        </button>
      </div>
    </div>
  );
}

export default PartyInformsPage;
