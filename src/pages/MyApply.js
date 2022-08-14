import React from 'react';
import MyApplication from '../components/myapplies/MyApplication';
import MyParties from '../components/myapplies/MyParties';

function MyApply() {
  return (
    <div>
      <h2>동아리 지원 내역</h2>
      <MyParties />
      <h2>동아리 지원서 관리</h2>
      <MyApplication />
    </div>
  );
}

export default MyApply;
