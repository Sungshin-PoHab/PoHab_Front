import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';
import '../../assets/ReadStandard.css';

function ReadStandard() {
  const [departments, setDepartments] = useState([]);
  const [nowIndex, setNowIndex] = useState(0);
  const [standardList, setStandardList] = useState(new Map());

  const { party_id, step_id } = useParams();

  const fetchDepartments = async () => {
    const res = await instance.get(`/recruit/department/${party_id}`);

    let data = res.data;
    data = data.filter((data) => data.department !== '개인정보');
    data = data.filter((data) => data.department !== '설명');
    setDepartments(data);

    // setNowIndex(
    //   data.find((data) => {
    //     return data.department === '공통';
    //   }).id
    // );

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

  const handleDepartClick = (event, data_id) => {
    event.preventDefault();
    setNowIndex(data_id);
  };

  const fetchStandards = async () => {
    const res = await instance.get(`/standard/${step_id}`);

    for (let i = 0; i < res.data.length; i++) {
      standardList.set(res.data[i].department.id, [...standardList.get(res.data[i].department.id), res.data[i]]);
    }
    setStandardList(standardList);
  };

  const renderStandard = (standardList, nowIndex) => {
    if (nowIndex === 0) return [];
    return standardList.get(nowIndex).map((standard) => {
      return [
        <div className={'L-row'}>
          <p>{standard.gradingStandard}</p>
          <button className={'L-delete-btn'} onClick={() => handleDelete(standard.id, standardList, nowIndex)}>
            삭제
          </button>
        </div>,
      ];
    });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchStandards();
  }, []);

  const handleDelete = async (standard_id, standardList, nowIndex) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const res = await instance.delete(`/standard/${standard_id}`);
      setStandardList(
        new Map([
          ...standardList,
          [nowIndex, standardList.get(nowIndex).filter((standard) => standard.id !== standard_id)],
        ])
      );
      alert(`채점 기준이 삭제됐습니다.`);
    } else {
      alert('취소됐습니다.');
    }
  };

  return (
    <div className={'L-container'}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 지정</h3>
        <p className={'L-description-context'}>모집 부서 별로 채점 질문을 확인할 수 있습니다.</p>
      </div>
      <div className={'L-row'}>{renderDepartments(departments)}</div>
      {renderStandard(standardList, nowIndex)}
      <button
        className={'L-button'}
          onClick={() => (window.location.href = `/party/informs/${party_id}`)}
      >
        채점 양식 확인 완료
      </button>
    </div>
  );
}

export default ReadStandard;
