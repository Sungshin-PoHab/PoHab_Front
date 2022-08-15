import { useParams } from 'react-router-dom';

import '../../assets/ApplyStatusForStaff/Buttons.css';

function Buttons(props) {

  let params = useParams();

  const onClick = () => {
    console.log('button clicked');
    window.location.href=`http://localhost:3000/grading/announcePNP/${params.department}/${params.step}`;
  }

  return (
    <div className='z-button-div'>
      <h4 style={{ marginBottom: '4%' }}>지원 관리</h4>
      <div className='z-management_btn'>
        <button className='z-buttons' style={{ float: 'right' }}>지원서 평가 기준 입력하기</button>
        <button className='z-buttons' style={{ float: 'left' }} onClick={ onClick }>합격자 발표하러 가기</button>
      </div>
      <div style={ {height: '80px'} }></div>
    </div>

  );
}

export default Buttons;