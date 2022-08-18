import '../../assets/GradingStatusForStaff/Guideline.css';

function Result(props) {
  const onClick = () => {
    window.location.href = `http://13.124.177.111:5000/user/myApply`;
  };

  return (
    <div>
      <div className="z-guide-div">
        <h4 className="z-guide-h4">마이페이지</h4>
        <p className="z-guide-p">내가 스태프로 소속된 동아리 및 지원 목록을 확인할 수 있는 페이지입니다.</p>
        <div style={{ padding: '15px' }}></div>
        <button className="z-button" onClick={onClick}>
          지원 목록 확인
        </button>
      </div>
    </div>
  );
}

export default Result;
