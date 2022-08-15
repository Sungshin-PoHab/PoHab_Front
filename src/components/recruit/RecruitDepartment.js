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
          className={'L-department-btn'}
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
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 등록</h3>
        <p className={'L-description-context'}>
          모집 부서 및 모집 인원을 등록할 수 있습니다.
        </p>
        <p className={'L-description-context'}>
          공통 부서는 기본 부서이므로 수정할 수 없습니다.
        </p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 부서</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'department'}
          onChange={handleChange}
          value={nowDepartName}
        />
        <div className={'L-plus'}>
          <button
            className={'L-department-btn'}
            onClick={handleDepartBtnClick}
            id={0}
          >
            공통
          </button>
          {departBtn}
          <button className={'L-department-btn'} onClick={handlePlusBtn}>
            +
          </button>
        </div>
      </div>
      <div className={'L-col'}>
        <p>모집 인원</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'personnel'}
          onChange={handleChange}
          value={personnel[nowIndex]}
        />
      </div>
      <input
        className={'L-submit'}
        type={'submit'}
        name={'step_submit'}
        value={'등록 끝내기'}
      />
    </form>
  );
}

export default RecruitDepartment;
