import React from 'react';

import '../../assets/PartyListForStaff/PartyList.css';

function PartyList(props) {

  const departmentClick = async (data, e) => {
    window.location.href = `http://localhost:5000/apply/forStaff/${ data.deId }/${ data.stepId }`;
  }

  return (
    <div>
      <button className={ props.isOddNum } style={{ height: '55px', borderRadius: '10px' }}
        onClick={ (e) => {departmentClick( { deId: props.departmentId, stepId: props.stepId },  e)}}>
        <div>
        <p className='z-party-p' style={{ color: 'black', lineHeight: '350%' }}>{ props.partyId }</p>
        <p className='z-role-p' style={{ lineHeight: '380%' }}>{ props.role }</p>
        </div>
      </button>
      { props.isOddNum ? <div className='padding-div'></div> : null }
    </div>
  )
}

export default PartyList;