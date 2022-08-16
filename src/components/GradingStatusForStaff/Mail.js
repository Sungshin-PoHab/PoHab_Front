import React, { useState, useEffect } from 'react';
import instance from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../../assets/GradingStatusForStaff/Mail.css';

function Mail(props) {

  let params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [dto, setDto] = useState('');

  const titleChange = ({ target: { value } }) => setTitle(value);
  const textChange = ({ target: { value } }) => setText(value);

  const authorization = window.localStorage.getItem('authorization');

  async function onSubmit(event) {
    event.preventDefault();
    const email = props.email;
    const emailData = { email: email, title: title, text: text };
    try {
      instance.post(`/grading/announcePNP/${params.department}/${params.step}`, emailData,
      {
        headers: { "Content-Type": 'application/json',
          authorization: authorization
        }
      }
      ).then((res) => {
        setDto(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
    try {
      console.log(dto);
      instance.post(`http://10.50.107.75:3000/sendEmail`, dto,
      ).then((res) => {
        console.log("그냥...");
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=''>
      <div style={ {height: '50px'} }></div>
      <div className='z-guide-div' style={{ marginBottom: '0' }}>
       <h4 className='z-guide-h4'>합격 베일 내용 입력</h4>
       <p className='z-guide-p'>해당 요일 메일로 전송됩니다. 다음 단계 알림 등을 여기서 적어주세요.</p>
      </div>
      <div style={ {height: '10px'} }></div>
      <form onSubmit={onSubmit}>
        <p className='z-email-p'>제목</p>
        <input type='text' name="title" value={title} onChange={titleChange} className='z-emailTitle-input'></input>
        <p className='z-email-p'>내용</p>
        <input type='text' name="text" value={text} onChange={textChange} className='z-emailText-input'></input>
        <button type="submit" className='z-email-button'>합격자 발표하기</button>
      </form>
      <div style={ {height: '100px'} }></div>
    </div>
  );
}

export default Mail;