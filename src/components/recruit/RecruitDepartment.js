import { useState } from 'react';
import instance from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';

function RecruitDepartment() {
  const [departBtn, setDepartBtn] = useState([]);
  const [departmentList, setDepartmentList] = useState(new Map());
  const [departments, setDepartments] = useState(['공통']);
  const [nowDepartName, setNowDepartName] = useState('공통');
  const [department, setDepartment] = useState('');

  let { party_id } = useParams();

  const handleDepartBtnClick = (event) => {
    event.preventDefault();

    setNowDepartName(event.target.innerHTML);
  };

  const handlePlusBtn = (event) => {
    event.preventDefault();

    if (department === '') alert('부서명을 입력하세요.');
    else {
      departmentList.set('공통', 0);

      setDepartments(departments.concat(nowDepartName));
      setDepartBtn(
        departBtn.concat(
          <button className={'L-department-btn'} onClick={handleDepartBtnClick}>
            {department}
          </button>
        )
      );
      setDepartment('');
    }
  };

  const handleChange = (event, departmentList, nowDepartmentName) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'department') {
      setDepartment(value);
    } else {
      setDepartmentList(new Map([...departmentList, [nowDepartmentName, value]]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let sum = 0;
    for (let personnel of departmentList.values()) sum += Number(personnel);

    let body = [];
    body.push({
      departments: '설명',
      personnel: 0,
    });
    body.push({
      departments: '개인정보',
      personnel: 0,
    });
    body.push({
      departments: '공통',
      personnel: sum,
    });
    for (let [department, personnel] of departmentList) {
      if (department !== '공통') {
        body.push({
          department: department,
          personnel: Number(personnel),
        });
      }
    }
    console.log(body);

    const res = await instance.post(party_id, body);
    console.log(res.data);
    window.location.replace('/party/informs/' + party_id);
  };

  return (
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 등록</h3>
        <p className={'L-description-context'}>모집 부서 및 모집 인원을 등록할 수 있습니다.</p>
        <p className={'L-description-context'}>공통 부서는 기본 부서이므로 수정할 수 없습니다.</p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 부서</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'department'}
          onChange={(event) => handleChange(event, departmentList, nowDepartName)}
          value={department}
        />
        <div className={'L-plus'}>
          <button className={'L-department-btn'} onClick={handleDepartBtnClick} id={0}>
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
          onChange={(event) => handleChange(event, departmentList, nowDepartName)}
          value={departmentList.get(nowDepartName)}
        />
      </div>
      <input className={'L-submit'} type={'submit'} name={'step_submit'} value={'등록 끝내기'} />
    </form>
  );
}

export default RecruitDepartment;
