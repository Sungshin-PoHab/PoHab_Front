import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RecruitDepartment() {
  const [nowIndex, setNowIndex] = useState(0);
  const [departBtn, setDepartBtn] = useState([]);
  const [departments, setDepartments] = useState(['공통']);
  const [nowDepartName, setNowDepartName] = useState('');
  const [personnel, setPersonnel] = useState([]);
  const [nowPersonnel, setNowPersonnel] = useState('');

  let { party_id } = useParams();

  const handleDepartBtnClick = (event) => {
    event.preventDefault();

    setNowIndex(event.target.id);
  };

  const handlePlusBtn = (event) => {
    event.preventDefault();

    setDepartments(departments.concat(nowDepartName));
    setDepartBtn(
      departBtn.concat(
        <button
          key={departments.length + 1}
          id={departments.length}
          onClick={handleDepartBtnClick}
        >
          {nowDepartName}
        </button>
      )
    );
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'department') {
      setNowDepartName(value);
    } else {
      // sync 문제 같은데 ㅠㅠ 해결이 안되네
      setNowPersonnel(value);
      console.log(nowPersonnel);
      // sync 문제 떄문에 일단 넣어놓음
      personnel[nowIndex] = value;
      setPersonnel(personnel);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = [];
    for (let i = 0; i < departBtn.length + 1; i++) {
      body.push({
        department: departments[i],
        personnel: Number(personnel[i]),
      });
    }

    const res = await axios.post(party_id, body);
    console.log(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>모집 부서 등록</h3>
        <p>모집 부서 및 모집 인원을 등록할 수 있습니다.</p>
        <p>공통 부서는 기본 부서이므로 수정할 수 없습니다.</p>
      </div>
      <div>
        <p>모집 부서</p>
        <input
          type={'text'}
          name={'department'}
          onChange={handleChange}
          value={nowDepartName}
        />
        <button onClick={handleDepartBtnClick} id={0}>
          공통
        </button>
        {departBtn}
        <button onClick={handlePlusBtn}>+</button>
      </div>
      <div>
        <p>모집 인원</p>
        <input
          type={'text'}
          name={'personnel'}
          onChange={handleChange}
          value={personnel[nowIndex]}
        />
      </div>
      <input type={'submit'} name={'step_submit'} value={'등록 끝내기'} />
    </form>
  );
}

export default RecruitDepartment;
