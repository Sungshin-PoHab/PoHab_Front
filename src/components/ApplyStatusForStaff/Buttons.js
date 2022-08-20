import { useParams } from 'react-router-dom';

import '../../assets/ApplyStatusForStaff/Buttons.css';

function Buttons(props) {

  let params = useParams();

  const onClick = () => {
    console.log('button clicked');
    window.location.href=`/grading/announcePNP/${params.department}/${params.step}`;
  }

  const onClick2 = () => {
    console.log('button clicked');
    window.location.href=`/grading/standard/create/${props.party}/${params.step}`;
  }

  return (
    <div className='z-button-div'>
      <div className='z-management_btn'>
        <button className='z-buttons' style={{ float: 'left' }} onClick={ onClick }>합격자 발표하러 가기 ></button>
        <button className='z-buttons' style={{ float: 'right' }} onClick={ onClick2 }>지원서 평가 기준 입력 ></button>
      </div>
      <div style={ {height: '80px'} }></div>
    </div>

  );
}

export default Buttons;