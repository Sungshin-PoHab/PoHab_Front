import React from 'react';

import '../../assets/PartyListForStaff/PartyList.css';

function PartyList(props) {

  const departmentClick = async (data, e) => {
    // console.log("button clicked");
    // const res = await instance.get(`http://localhost:8787/apply/forStaff/${ data.deId }/${ data.stepId }`, {
    //   headers: {
    //     // authorization: authorization,
    //   },
    // });
    // console.log(res.data);
    window.location.href = `http://localhost:3000/apply/forStaff/${ data.deId }/${ data.stepId }`;
  }

  return (
    <div>
      <button className={ props.isOddNum } style={{ height: '50px' }}
      onClick={ (e) => {departmentClick( { deId: props.departmentId, stepId: props.stepId },  e)}}>
        <div>
        <p className='party-p'>{ props.partyId }</p>
        <p className='role-p'>{ props.role }</p>
        </div>
      </button>
      { props.isOddNum ? <div className='padding-div'></div> : null }
    </div>
  )
}

export default PartyList;