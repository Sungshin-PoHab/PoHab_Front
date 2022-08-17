import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../../utils/axiosConfig';
import '../../assets/CreateStandard.css';

function CreateStandard() {
  const [departments, setDepartments] = useState([]);
  const [standard, setStandard] = useState('');
  const [standardList, setStandardList] = useState(new Map());
  const [nowIndex, setNowIndex] = useState(0);

  const { party_id, step_id } = useParams();

  const fetchDepartments = async () => {
    const res = await instance.get(`/recruit/department/${party_id}`);

    let data = res.data;
    data = data.filter((data) => data.department !== '개인정보');
    data = data.filter((data) => data.department !== '설명');
    setDepartments(data);

    setNowIndex(
      data.find((data) => {
        return data.department === '공통';
      }).id
    );

    data.map((data) => {
      standardList.set(data.id, []);
      setStandardList(standardList);
    });
  };

  const renderDepartments = (departments) => {
    return departments.map((department) => {
      return [
        <button className={'L-department-btn'} onClick={(event) => handleDepartClick(event, department.id)}>
          {department.department}
        </button>,
      ];
    });
  };

  useEffect(() => {
    fetchDepartments();
    console.log(nowIndex);
  }, []);

  const handleChange = (event) => {
    setStandard(event.target.value);
  };

  const handlePlusClick = (event, nowIndex, standard) => {
    event.preventDefault();

    if (standard === '') alert('채점 기준을 입력해주세요.');
    else {
      standardList.set(nowIndex, [...standardList.get(nowIndex), standard]);
      setStandardList(standardList);
      setStandard('');
    }
  };

  const handleDepartClick = (event, data_id) => {
    event.preventDefault();
    setNowIndex(data_id);
  };

  const renderStandard = (standardList, nowIndex) => {
    if (nowIndex === 0) return [];
    return standardList.get(nowIndex).map((standard) => {
      return [<p>{standard}</p>];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = [];
    for (let [departmentId, list] of standardList) {
      list.forEach((standard) => {
        body.push({
          departmentId: departmentId,
          gradingStandard: standard,
        });
      });
    }

    const res = await instance.post(`/standard/${step_id}`, body);
    console.log(res.data);
    window.location.replace(`/grading/standard/read/${party_id}/${step_id}`);
  };

  return (
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 지정</h3>
        <p className={'L-description-context'}>모집 부서 별로 채점 질문을 다르게 지정할 수 있습니다.</p>
      </div>
      <div className={'L-row'}>{renderDepartments(departments)}</div>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>채점 기준 등록란</h3>
        <p className={'L-description-context'}>1점부터 5점까지 점수를 줄 수 있습니다.</p>
      </div>
      <div className={'L-standard'}>
        <p>채점 기준</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'standardInput'}
          onChange={handleChange}
          value={standard}
        />
        <button className={'L-button'} onClick={(event) => handlePlusClick(event, nowIndex, standard)}>
          + 채점 기준 추가하기
        </button>
      </div>
      <div>{renderStandard(standardList, nowIndex)}</div>
      <input className={'L-submit'} type={'submit'} value={'등록하기'} />
    </form>
  );
}
export default CreateStandard;
