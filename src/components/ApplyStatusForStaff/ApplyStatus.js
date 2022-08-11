import './ApplyStatus.css';

function ApplyStatus(props) {

  return (
      <div className='party-div'>
        <h1 className='party-h1'>{ props.party } </h1>
        <h4 className='apply-h4'>지원 현황</h4>
        {/* {old_datas.map(old => (
            <button>{old}기</button>
          ))}
          <button>+ 기수 추가</button>
      </div> */}

      <div>
        <h4>지원 인원</h4>
          현재 <p className='applicant-p'>{ props.applicantNum }</p>명이 지원 중이에요!  <p className='competition-p'>경쟁률{ props.competition } : 1</p>

        <div style={{ height: '3px'}}></div>
        <h4>지원 목록</h4>
          지원 순서로 정렬됩니다.
        <div style={{ height: '10px'}}></div>
      </div>
      </div>
  );
}

export default ApplyStatus;