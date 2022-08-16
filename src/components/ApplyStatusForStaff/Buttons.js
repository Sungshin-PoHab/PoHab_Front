import '../../assets/ApplyStatusForStaff/Buttons.css';

function Buttons(props) {

  return (
    <div className='button-div'>
      <h4 style={{ marginBottom: '4%' }}>지원 관리</h4>
      <div className='management_btn'>
        <button className='buttons' style={{ float: 'left' }}>지원서 마감하기</button>
        <button className='buttons' style={{ float: 'right' }}>지원서 평가 기준 입력하기</button>
        <button className='buttons' style={{ float: 'left' }}>서류 합격자 발표하러 가기</button>
        <button className='buttons' style={{ float: 'right' }}>최종 합격자 발표하러 가기</button>
      </div>
    </div>

  );
}

export default Buttons;