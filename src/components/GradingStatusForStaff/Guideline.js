import '../../assets/GradingStatusForStaff/Guideline.css';

function Result(props) {

  return (
    <div>
      <div className='z-guide-div'>
        <h4 className='z-guide-h4'>합격자 발표</h4>
        <p className='z-guide-p'>발표가 완료되면 지원자에게 바로 메일이 보내집니다.</p>
      </div>
      <div className='z-guide-div' style={{ height: '50px' }}>
        <h4 className='z-guide-h4' style={ {marginTop: '2%'}}>지원자 목록 및 최종 점수</h4>
      </div>
    </div>

  );
}

export default Result;