import React, { useState, useEffect, useParams } from 'react';

import '../../assets/PartyListForStaff/PartyList.css';

function PartyList(props) {
  // 고쳐야 하는 부분 (링크 수정)
  const departmentClick = async (data, e) => {
    window.location.href = `http://13.124.177.111:5000/party/informs/${props.partyId}`;
  };

  return (
    <div>
      <button
        className={props.isOddNum}
        style={{ height: '55px', borderRadius: '10px' }}
        onClick={(e) => {
          departmentClick({ deId: props.departmentId, stepId: props.stepId }, e);
        }}
      >
        <div>
          {/* <p className="z-party-p" style={{ color: 'black', lineHeight: '350%' }}>
            {props.partyId}
          </p>
          <p className="z-role-p" style={{ lineHeight: '380%' }}>
            {props.role}
          </p> */}
          <p className="z-party-p" style={{ color: 'black', lineHeight: '350%' }}>
            {props.partyId.split('-')[0]} {props.partyId.split('-')[1]}기
          </p>
          <p className="z-role-p" style={{ lineHeight: '380%' }}>
            {props.role}
          </p>
        </div>
      </button>
      {props.isOddNum ? <div className="padding-div"></div> : null}
    </div>
  );
}

export default PartyList;
