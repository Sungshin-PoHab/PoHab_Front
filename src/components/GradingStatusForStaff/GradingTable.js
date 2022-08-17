import React, { useState, useEffect } from 'react';

import Mail from './Mail';
import Result from './Result';
import '../../assets/GradingStatusForStaff/GradingTable.css';

function GradingTable(props) {

  let key = 1;

  const [passList, setPassList] = useState(new Set());
  const [npassList, setNpassList] = useState(props.npList);

  const checkedItemHandler = (id, isChecked) => {
  if (isChecked) {
    passList.add(id);
    setPassList(passList);

    npassList.delete(id);
    setNpassList(npassList);

    console.log(passList);
    console.log(npassList);
  } else if (!isChecked && passList.has(id)) {
    passList.delete(id);
    setPassList(passList);

    npassList.add(id);
    setNpassList(npassList);
    
    console.log(passList);
    console.log(npassList);
    }
  };

  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(target.value, target.checked);
  };

  return (
    <div>
      <table className='z-grade-table'>
        <tr>
          <td className='z-td' style={{ fontWeight: 'bold' }}>순위</td>
          <td className='z-td' style={{ fontWeight: 'bold' }}>지원자 명</td>
          <td className='z-td' style={{ fontWeight: 'bold' }}>최종 점수</td>
          <td className='z-td' style={{ fontWeight: 'bold' }}>최저/최고 점수</td>
          <td className='z-td' style={{ fontWeight: 'bold' }}>합격 여부</td>
        </tr>

        <div className='z-padding'></div>  
          {props.applicantGradingDtoList.map( data => (
            <tr key={ key++ }>
              <td className='z-td'>{ key }</td>
              <td className='z-td'>{ data.name }</td>
              <td className='z-td'>{ data.score }</td>
              <td className='z-td'>{ data.highScore } / { data.lowestScore }</td>
              <td className='z-td'>
                <input type='checkbox' className='z-full-button' onChange={(e) => checkHandler(e)} value={ data.applyId }></input> 
              </td>
            </tr>
          ))}
        <div>
        </div>
      </table>
      <Result overallAvg={ props.overallAvg }
      highScore={ props.highScore } lowestScore={ props.lowestScore }/>
      <Mail applicant={ props.applicantGradingDtoList } email={ Array.from(passList) } npList={ Array.from(npassList) }/>
    </div>
  );
}

export default GradingTable ;