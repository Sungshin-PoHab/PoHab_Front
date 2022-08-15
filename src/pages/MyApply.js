import React from 'react';
import MyApplication from '../components/myapplies/MyApplication';
import MyParties from '../components/myapplies/MyParties';

function MyApply() {
  return (
    <div>
      <h1>동아리 지원 내역</h1>
      <MyParties />
      <h1>동아리 지원서 관리</h1>
      <MyApplication />
    </div>
  );
}

export default MyApply;
