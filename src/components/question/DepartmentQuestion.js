import { useCallback, useEffect, useRef, useState } from 'react';
import instance from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';
import '../../assets/question/DepartmentQuestion.css';

function DepartmentQuestion() {
  const [question, setQuestion] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [lengthList, setLengthList] = useState([]);
  const [departments, setDepartments] = useState('');
  const [nowIndex, setNowIndex] = useState(0);

  const department_ids = useRef([]);
  const { party_id } = useParams();

  const handleDepartmentClick = (event, department_id) => {
    event.preventDefault();

    console.log(department_id);
    setNowIndex(department_id);
  };

  const getDepartments = useCallback(async () => {
    const res = await instance.get('/recruit/department/' + party_id);
    department_ids.current.length = 0;

    setNowIndex(
      res.data.find((data) => {
        return data.department === '공통';
      }).id
    );

    let max_id = 0;
    setDepartments(
      res.data.map((data) => {
        if (data.department === '개인정보' || data.department === '설명') {
          // pass
        } else {
          if (!department_ids.current.includes(data.id))
            department_ids.current.push(data.id);
          if (max_id < data.id) max_id = data.id;
          return [
            <button
              className={'L-department-btn'}
              onClick={(event) => handleDepartmentClick(event, data.id)}
            >
              {data.department}
            </button>,
          ];
        }
      })
    );

    setQuestionList([...Array(max_id + 1)].map(() => Array(0)));
    setLengthList([...Array(max_id + 1)].map(() => Array(0)));
  }, [party_id, handleDepartmentClick]);

  useEffect(() => {
    console.log(department_ids.current.values());
    getDepartments();
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

  const handlePlusClick = (event) => {
    event.preventDefault();

    console.log(questionList[nowIndex]);
    questionList[nowIndex] = [...questionList[nowIndex], <p>{question}</p>];
    setQuestionList(questionList);

    lengthList[nowIndex] = [...lengthList[nowIndex], <p>{maxLength}</p>];
    setLengthList(lengthList);

    setQuestion('');
    setMaxLength('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = [];
    department_ids.current.forEach((id) => {
      for (let i = 0; i < questionList[id].length; i++) {
        body.push({
          departmentId: id,
          question: questionList[id][i].props.children,
          maxLength: Number(lengthList[id][i].props.children),
        });
      }
    });

    const res = await instance.post('/question', body);
    console.log(res.data);
    // 추후 리다이렉트 필요
  };

  return (
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>모집 부서 지정</h3>
        <p className={'L-description-context'}>
          모집 부서 별로 지원서 질문을 다르게 지정할 수 있습니다.
        </p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>모집 부서</p>
        <div className={'L-row'}>{departments}</div>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>질문 입력</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'question'}
          onChange={handleChange}
          value={question}
        />
        <p className={'L-p'}>최대 글자수 입력</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'maxLength'}
          onChange={handleChange}
          value={maxLength}
        />
      </div>
      <button className={'L-button'} onClick={handlePlusClick}>
        + 질문 추가하기
      </button>
      <div>
        {questionList[nowIndex]}
        {lengthList[nowIndex]}
      </div>
      <input
        className={'L-submit'}
        type={'submit'}
        name={'question_submit'}
        value={'지원서 양식 등록하기'}
      />
    </form>
  );
}

export default DepartmentQuestion;
