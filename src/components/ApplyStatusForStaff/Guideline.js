import '../../assets/GradingStatusForStaff/Guideline.css';

function Result(props) {

  return (
    <div>
      <div className='z-guide-div' style={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <h4 className='z-guide-h4' style={{ fontWeight: 'bold' }}>{ props.party } 동아리 지원 현황</h4>
        <p className='z-guide-p'>지원자 및 지원 현황을 확인할 수 있습니다.</p>
      </div>
    </div>
  );
}

export default Result;