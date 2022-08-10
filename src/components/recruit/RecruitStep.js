import { useState } from 'react';
import axios from 'axios';

function RecruitStep() {
  const [stepBtn, setBtnStep] = useState([]);
  const [btnCount, setBtnCount] = useState(1);
  const [nowStep, setNowStep] = useState(0);
  const [startDate, setStartDate] = useState([
    new Date(Date.now()).toISOString().split('.')[0],
  ]);
  const [endDate, setEndDate] = useState([
    new Date(Date.now()).toISOString().split('.')[0],
  ]);
  const [nowDate, setNowDate] = useState(
    new Date(Date.now()).toISOString().split('.')[0]
  );

  const handleStepBtnClick = (event) => {
    event.preventDefault();

    setNowStep(event.target.innerHTML - 1);
  };

  const handlePlusBtn = (event) => {
    event.preventDefault();

    setBtnStep(
      stepBtn.concat(<button onClick={handleStepBtnClick}>{btnCount}</button>)
    );
    setBtnCount(btnCount + 1);
  };

  const handleDateChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'start_date') {
      // sync 문제 떄문에 일단 넣어놓음
      setNowDate(value);
      console.log(nowDate);
      startDate[nowStep] = value;
      setStartDate(startDate);
    } else {
      // sync 문제 떄문에 일단 넣어놓음
      setNowDate(value);
      console.log(nowDate);
      endDate[nowStep] = value;
      setEndDate(endDate);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('submit');

    let body = [];
    for (let i = 0; i < stepBtn.length; i++) {
      body.push({
        step: i + 1,
        startDate: startDate[i],
        endDate: endDate[i],
      });
    }

    console.log(body);

    // 추후 변경 필수
    let group_id = 'sungshin22';
    const res = await axios.post(`${group_id}`, body);
    console.log(res.data);

    document.location.replace('department');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>모집 일정 등록</h3>
        <p>모집 단계와 모집 시작 및 모집 마감 일정을 등록할 수 있습니다.</p>
        <p>모집 단계 이름은 수정이 불가하니 주의해주세요.</p>
      </div>
      <div>
        {stepBtn}
        <button onClick={handlePlusBtn}>+</button>
      </div>
      <div>
        <p>모집 시작 일정</p>
        <input
          type={'datetime-local'}
          name={'start_date'}
          onChange={handleDateChange}
          value={startDate[nowStep]}
        />
      </div>
      <div>
        <p>모집 종료 일정</p>
        <input
          type={'datetime-local'}
          name={'end_date'}
          onChange={handleDateChange}
          value={endDate[nowStep]}
        />
      </div>
      <input
        type={'submit'}
        name={'step_submit'}
        value={'모집 부서 이어서 등록 >'}
      />
    </form>
  );
}

export default RecruitStep;
