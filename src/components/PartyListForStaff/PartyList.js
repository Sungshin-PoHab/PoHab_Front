import React from 'react';

import '../../assets/PartyListForStaff/PartyList.css';

function PartyList(props) {

  const departmentClick = async (data, e) => {
    window.location.href = `http://localhost:5000/apply/forStaff/${ data.deId }/${ data.stepId }`;
  }

  return (
    <div>
      <button className={ props.isOddNum } style={{ height: '50px' }}
        onClick={ (e) => {departmentClick( { deId: props.departmentId, stepId: props.stepId },  e)}}>
        <div>
        <p className='z-party-p'>{ props.partyId }</p>
        <p className='z-role-p'>{ props.role }</p>
        </div>
      </button>
      { props.isOddNum ? <div className='padding-div'></div> : null }
    </div>
  )
}

export default PartyList;