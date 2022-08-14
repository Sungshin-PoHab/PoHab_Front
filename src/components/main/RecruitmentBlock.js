import React from 'react';
import "../../assets/Main/RecruitmentBlock.css";
import "../../assets/Main/Main.css";

function RecruitmentBlock(props) {
  return (
    <div>
      <div className={ props.isOddNum }>
        <div className='availability-div'>
          <p>{ props.availability ? '모집중' : '모집마감' }</p>
        </div>
        <div className='party-div'>
          <h3 className='party-name'>{ props.party } </h3>
          <p className='department-p1'><p className='department-p'>공통</p></p>
          <p className='department-p'>{ props.department.map(data => (
            <p className='department-p'> { data }</p>
          )) }</p>
          <div className='competition-div'>{ props.competition.map(data => (
            <p className='competition-props'>{ data }</p>
          )) } </div>
        </div>
        <div className='date-div'>
          {props.stepDateDtos.map(data => (
            <div>
              <p className='step-p'>{ data.step }단계 </p>
              <p className='date-p'>모집 기한: { data.startDate } ~ { data.endDate } { data.endTime } { data.pmAm } </p>
              <p className='date-p' style={{ color: '#84D5D5', fontWeight: '900'}}>{ data.availability ? '모집중' : '모집마감'}</p>
            </div>
          ))}
        </div>
      </div>
      { props.isOddNum ? <div className='padding-div'></div> : null }
    </div>
  )
}

export default RecruitmentBlock;