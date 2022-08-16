import '../../assets/GradingStatusForStaff/Result.css';

function Result(props) {

  return (
    <div className='result-div'>
      <h5 className='result-h5' style={{marginLeft: '8%', marginRight: '25%'}}>전체 평균: { props.overallAvg }</h5>
      <h5 className='result-h5' style={{marginRight: '25%'}}>최고 점수: { props.highScore }</h5>
      <h5 className='result-h5'>최저 점수: { props.lowestScore }</h5>

    </div>

  );
}

export default Result;