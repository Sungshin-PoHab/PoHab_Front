import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../../utils/axiosConfig';

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
        <button onClick={(event) => handleDepartClick(event, department.id)}>
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

  const handlePlusClick = (event, nowIndex) => {
    event.preventDefault();

    standardList.set(nowIndex, [...standardList.get(nowIndex), standard]);
    setStandardList(standardList);
    setStandard('');
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>모집 부서 지정</h3>
        <p>모집 부서 별로 채점 질문을 다르게 지정할 수 있습니다.</p>
        <div>{renderDepartments(departments)}</div>
      </div>
      <div>
        <h3>채점 기준 등록란</h3>
        <p>1점부터 5점까지 점수를 줄 수 있습니다.</p>
      </div>
      <div>
        <p>채점 기준</p>
        <input
          type={'text'}
          name={'standardInput'}
          onChange={handleChange}
          value={standard}
        />
        <button onClick={(event) => handlePlusClick(event, nowIndex)}>
          + 채점 기준 추가하기
        </button>
      </div>
      <div>{renderStandard(standardList, nowIndex)}</div>
      <input type={'submit'} value={'등록하기'} />
    </form>
  );
}
export default CreateStandard;
