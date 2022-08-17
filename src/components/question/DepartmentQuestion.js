import { useCallback, useEffect, useRef, useState } from 'react';
import instance from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';
import '../../assets/question/DepartmentQuestion.css';

function DepartmentQuestion() {
  const [question, setQuestion] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [questionList, setQuestionList] = useState(new Map());
  const [nowIndex, setNowIndex] = useState(0);
  const [departments, setDepartments] = useState([]);

  const { party_id } = useParams();

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
      questionList.set(data.id, []);
      setQuestionList(questionList);
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

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'question') {
      setQuestion(value);
    } else {
      setMaxLength(value);
    }
  };

  const handlePlusClick = (event, nowIndex, question, maxLength) => {
    event.preventDefault();

    if (question === '' || maxLength === '') {
      alert('채점 기준을 입력해주세요.');
    } else {
      questionList.set(nowIndex, [...questionList.get(nowIndex), [question, maxLength]]);
      setQuestionList(questionList);
    }

    setQuestion('');
    setMaxLength('');
  };

  const renderQuestion = (questionList, nowIndex) => {
    if (nowIndex === 0) return [];
    return questionList.get(nowIndex).map((question) => {
      return [
        <div className={'L-row'}>
          <p>{question[0]}</p>
          <p>{question[1]} 자</p>
        </div>,
      ];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = [];
    for (let [departmentId, questions] of questionList) {
      questions.forEach((question) => {
        body.push({
          departmentId: departmentId,
          question: question[0],
          maxLength: question[1],
        });
      });
    }

    const res = await instance.post('/question', body);
    console.log(res.data);
    window.location.replace('/question/' + party_id);
  };

  return (
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 지정</h3>
        <p className={'L-description-context'}>모집 부서 별로 지원서 질문을 다르게 지정할 수 있습니다.</p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 부서</p>
        <div className={'L-row'}>{renderDepartments(departments)}</div>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>질문 입력</p>
        <input className={'L-input-text'} type={'text'} name={'question'} onChange={handleChange} value={question} />
        <p className={'L-p'}>최대 글자수 입력</p>
        <input className={'L-input-text'} type={'text'} name={'maxLength'} onChange={handleChange} value={maxLength} />
      </div>
      <button className={'L-button'} onClick={(event) => handlePlusClick(event, nowIndex, question, maxLength)}>
        + 질문 추가하기
      </button>
      {renderQuestion(questionList, nowIndex)}
      <input className={'L-submit'} type={'submit'} name={'question_submit'} value={'지원서 양식 등록하기'} />
    </form>
  );
}

export default DepartmentQuestion;
