import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';

function ReadRecruit() {
  const [departments, setDepartments] = useState([]);
  const [steps, setSteps] = useState([]);

  const { party_id } = useParams();

  const fetchDepartments = async () => {
    const res = await instance.get(`/recruit/department/${party_id}`);

    let data = res.data;
    data = data.filter((data) => data.department !== '개인정보');
    data = data.filter((data) => data.department !== '설명');
    setDepartments(data);
  };

  const fetchSteps = async () => {
    const res = await instance.get('/recruit/step/' + party_id);
    setSteps(res.data);
  };

  const renderDepartments = (departments) => {
    return departments.map((department) => {
      return [
        <div className={'L-row'}>
          <p>{department.department}</p>
          <button className={'L-delete-btn'} onClick={() => handleDepartDelete(department.id, departments)}>
            삭제
          </button>
        </div>,
      ];
    });
  };

  const renderSteps = (steps) => {
    return steps.map((step) => {
      return [
        <div className={'L-row'}>
          <p>{step.step}</p>
          <button className={'L-delete-btn'} onClick={() => handleStepDelete(step.id, steps)}>
            삭제
          </button>
        </div>,
      ];
    });
  };

  const handleStepDelete = async (step_id, steps) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const res = await instance.delete(`/recruit/step/${step_id}`);
      setSteps(steps.filter((step) => step.id !== step_id));
      alert(`모집 일정이 삭제됐습니다.`);
    } else {
      alert('취소됐습니다.');
    }
  };

  const handleDepartDelete = async (depart_id, departments) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const res = await instance.delete(`/recruit/department/${depart_id}`);
      setDepartments(departments.filter((department) => department.id !== depart_id));
      alert(`모집 일정이 삭제됐습니다.`);
    } else {
      alert('취소됐습니다.');
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchSteps();
  }, []);

  return (
    <div className={'L-container'}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 일정 확인</h3>
        <p className={'L-description-context'}>모집 부서 및 모집 인원을 확인할 수 있습니다.</p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 일정</p>
        {renderSteps(steps)}
      </div>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 확인</h3>
        <p className={'L-description-context'}>모집 부서 및 모집 인원을 확인할 수 있습니다.</p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 부서</p>
        {renderDepartments(departments)}
      </div>
    </div>
  );
}
export default ReadRecruit;
