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

  async function onSubmit() {
    const passList = props.passList;
    const emailData = { passList: passList, title: title, text: text };
    try {
      instance.post(`/grading/announcePNP/${params.department}/${params.step}`, emailData,
      {
        headers: { "Content-Type": 'application/json',
          authorization: authorization
        }
      }
      ).then((res) => {
        this.setDto(res.data);
        console.log(dto);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=''>
      <div style={ {height: '30px'} }></div>
      <h4 style={ {fontWeight: '700'}}>합격 메일 보내기</h4>
      <div style={ {height: '10px'} }></div>
      <form onSubmit={onSubmit}>
        <input type='text' name="title" value={title} onChange={titleChange} className='emailTitle-input'></input>
        <input type='text' name="text" value={text} onChange={textChange} className='emailText-input'></input>
        <button type="submit" className='email-button'>전송하기</button>
      </form>
      <div style={ {height: '100px'} }></div>
    </div>
  );
}

export default Mail;