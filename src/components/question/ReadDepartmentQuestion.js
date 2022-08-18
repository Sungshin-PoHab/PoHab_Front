import { useRef, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';

function ReadDepartmentQuestion() {
  const [questionList, setQuestionList] = useState(new Map());
  const [departments, setDepartments] = useState([]);
  const [nowIndex, setNowIndex] = useState(0);
  const { party_id } = useParams();

  const handleDelete = async (question_id, questionList, nowIndex) => {
    if (window.confirm('해당 질문을 정말 삭제하시겠습니까?')) {
      await instance.delete('/question/' + question_id);
      setQuestionList(
        new Map([
          ...questionList,
          [nowIndex, questionList.get(nowIndex).filter((question) => question.id !== question_id)],
        ])
      );
      alert('삭제했습니다.');
    } else {
      alert('취소 되었습니다.');
    }
  };

  const handleDepartClick = (event, department_id) => {
    event.preventDefault();

    setNowIndex(department_id);
  };

  const fetchDepartments = async () => {
    const res = await instance.get(`/recruit/department/${party_id}`);

    res.data.map((data) => {
      questionList.set(data.id, []);
      setQuestionList(questionList);
    });

    let data = res.data;
    data = data.filter((data) => data.department !== '개인정보');
    data = data.filter((data) => data.department !== '설명');
    setDepartments(data);
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

  const fetchQuestions = async () => {
    const res = await instance.get('/question/' + party_id);
    if (res.status !== 200) {
      console.error('error!');
    }

    console.log(res.data.length);
    console.log(questionList);
    for (let i = 0; i < res.data.length; i++) {
      questionList.set(res.data[i].department.id, [...questionList.get(res.data[i].department.id), res.data[i]]);
    }
    setQuestionList(questionList);
  };

  const renderQuestions = (questionList, nowIndex) => {
    if (nowIndex === 0) return [];
    return questionList.get(nowIndex).map((question) => {
      return [
        <div className={'L-row'}>
          <p>{question.question}</p>
          <button className={'L-delete-btn'} onClick={() => handleDelete(question.id, questionList, nowIndex)}>
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
    fetchQuestions();
  }, []);

  return (
    <div className={'L-container'}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 지정</h3>
        <p className={'L-description-context'}>무집 부서 별로 지원서 질문을 다르게 지정할 수 있습니다.</p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>카테고리</p>
        <div className={'L-row'}>{renderDepartments(departments)}</div>
      </div>
      {renderQuestions(questionList, nowIndex)}
      <button className={'L-button'} onClick={() => window.location.replace('/party/informs/' + party_id)}>
        확인 완료하기
      </button>
    </div>
  );
}

export default ReadDepartmentQuestion;
