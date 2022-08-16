import '../../assets/GradingStatusForStaff/Result.css';

function Result(props) {

  return (
    <div className='z-result-div'>
      <h5 className='z-result-h5' style={{ marginRight: '15%' }}>최고 점수: { props.highScore }</h5>
      <h5 className='z-result-h5' style={{ marginLeft: '8%', marginRight: '23%' }}>전체 평균: { props.overallAvg }</h5>
      <h5 className='z-result-h5'>최저 점수: { props.lowestScore }</h5>
    </div>

  );
}

export default Result;