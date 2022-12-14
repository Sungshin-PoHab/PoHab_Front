import instance from '../utils/axiosConfig';
import React, { useState } from 'react';
import InputForm from '../utils/form';
import '../assets/PartyEnroll/PartyEnroll.css';

function PartyEnroll() {
  let [name, changeName] = useState('');
  let [nth, changeNth] = useState('');
  let [category, changeCategory] = useState('동아리');

  let nameHandler = (e) => {
    e.preventDefault();
    changeName(e.target.value);
  };
  let nthHandler = (e) => {
    e.preventDefault();
    changeNth(e.target.value);
  };
  let categoryHandler = (e) => {
    e.preventDefault();
    changeCategory(e.target.value);
  };
  let submitHandler = (e) => {
    e.preventDefault();
    console.log(name, nth, category);
    let body = {
      name: name,
      nth: nth,
      category: category,
    };
    console.log(body);
    instance
      .post(`/party/enroll`, body, {
        headers: {
          Authorization: window.localStorage.getItem('authorization'),
        },
      })
      .then((res) => {
        console.log(res);
        window.location = `/party/${name}-${nth}/${res.data.code}`;
      });
  };

  return (
    <div class="J_wrap_div">
      <form onSubmit={submitHandler}>
        <div class="J_form">
          <div>
            소속 이름<br></br>
            <InputForm type="text" data="name" handler={nameHandler} />
          </div>
          <div>
            기수<br></br>
            <InputForm type="text" data="nth" handler={nthHandler} />
          </div>
          <div>
            카테고리<br></br>
            <select id="J_select" name="category" value={category} onChange={categoryHandler}>
              <option value="동아리">동아리</option>
              <option value="기업">기업</option>
              <option value="인턴">인턴</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div>
            <button id="J_button" type="submit">
              생성하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PartyEnroll;
