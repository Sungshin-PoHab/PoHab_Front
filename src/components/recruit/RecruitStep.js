import { useEffect, useState } from 'react';
import instance from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';
import '../../assets/recruit/RecruitStep.css';

function RecruitStep() {
  const [startDate, setStartDate] = useState(new Date(Date.now()).toISOString().split('.')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now()).toISOString().split('.')[0]);
  const [stepList, setStepList] = useState(new Map());
  const [stepBtn, setBtnStep] = useState([]);
  const [btnCount, setBtnCount] = useState(1);
  const [nowStep, setNowStep] = useState(1);

  const { party_id } = useParams();

  useEffect(() => {
    stepList.set(nowStep, [startDate, endDate]);
    setStepList(stepList);
  }, []);

  const handleStepBtnClick = (event) => {
    event.preventDefault();

    setNowStep(Number(event.target.innerHTML));
  };

  const handlePlusBtn = (event, stepList, btnCount) => {
    event.preventDefault();

    stepList.set(btnCount, []);
    setStepList(stepList);
    setNowStep(btnCount);

    setBtnStep(
      stepBtn.concat(
        <button className={'L-department-btn'} onClick={handleStepBtnClick}>
          {btnCount}
        </button>
      )
    );
    setBtnCount(btnCount + 1);
  };

  const handleDateChange = (event, startDate, endDate, nowStep, stepList) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'start_date') {
      setStartDate(value);
      setStepList(stepList.set(nowStep, [value, endDate]));
      console.log(stepList);
    } else {
      setEndDate(value);
      setStepList(stepList.set(nowStep, [startDate, value]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = [];
    for (let [step, date] of stepList) {
      body.push({
        step: step,
        startDate: date[0],
        endDate: date[1],
      });
    }
    console.log(body);

    const res = await instance.post(`/recruit/${party_id}`, body);
    console.log(res.data);

    document.location.replace(`/recruit/department/%{party_id}`);
  };

  return (
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 일정 등록</h3>
        <p className={'L-description-context'}>모집 단계와 모집 시작 및 모집 마감 일정을 등록할 수 있습니다.</p>
        <p className={'L-description-context'}>모집 단계 이름은 수정이 불가하니 주의해주세요.</p>
      </div>
      <div className={'L-plus'}>
        {stepBtn}
        <button className={'L-department-btn'} onClick={(event) => handlePlusBtn(event, stepList, btnCount)}>
          +
        </button>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 시작 일정</p>
        <input
          className={'L-input-text'}
          type={'datetime-local'}
          name={'start_date'}
          onChange={(event) => handleDateChange(event, startDate, endDate, nowStep, stepList)}
          value={stepList.get(nowStep) && stepList.get(nowStep)[0]}
        />
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 종료 일정</p>
        <input
          className={'L-input-text'}
          type={'datetime-local'}
          name={'end_date'}
          onChange={(event) => handleDateChange(event, startDate, endDate, nowStep, stepList)}
          value={stepList.get(nowStep) && stepList.get(nowStep)[1]}
        />
      </div>
      <input className={'L-submit'} type={'submit'} name={'step_submit'} value={'모집 부서 이어서 등록 >'} />
    </form>
  );
}

export default RecruitStep;
