import '../../assets/GradingStatusForStaff/Guideline.css';
import PartyListForStaff from '../../pages/PartyListForStaff';

function Result(props) {
  const onClick = () => {
    window.location.href = `http://frontserver:5000/party/enroll`;
  };

  return (
    <div style={{ marginTop: '90px' }}>
      <div className="z-guide-div">
        <h4 className="z-guide-h4" style={{ lineHeight: '250%' }}>
          내가 소속된 동아리
        </h4>
        <PartyListForStaff />
        <button className="z-button" style={{ marginTop: '0px' }} onClick={onClick}>
          소속 생성하기
        </button>
      </div>
    </div>
  );
}

export default Result;
