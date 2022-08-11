import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    const res = await axios.get('/recruit/department/' + party_id);
    department_ids.current.length = 0;

    setQuestionList([...Array(res.data.length + 1)].map(() => Array(0)));
    setLengthList([...Array(res.data.length + 1)].map(() => Array(0)));

    setNowIndex(
      res.data.find((data) => {
        return data.department === '공통';
      }).id
    );

    setDepartments(
      res.data.map((data) => {
        if (data.department === '개인정보' || data.department === '설명') {
          // pass
        } else {
          if (!department_ids.current.includes(data.id))
            department_ids.current.push(data.id);
          return [
            <button onClick={(event) => handleDepartmentClick(event, data.id)}>
              {data.department}
            </button>,
          ];
        }
      })
    );
  }, [party_id, handleDepartmentClick]);

  useEffect(() => {
    console.log(department_ids);
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

    const res = await axios.post('/question', body);
    console.log(res.data);
    // 추후 리다이렉트 필요
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>카테고리 지정</h3>
        <p>카테고리 별로 지원서 질문을 다르게 지정할 수 있습니다.</p>
      </div>
      <div>
        <p>카테고리</p>
        {departments}
      </div>
      <div>
        <div>
          <p>질문 입력</p>
          <input
            type={'text'}
            name={'question'}
            onChange={handleChange}
            value={question}
          />
          <p>최대 글자수 입력</p>
          <input
            type={'text'}
            name={'maxLength'}
            onChange={handleChange}
            value={maxLength}
          />
        </div>
        <button onClick={handlePlusClick}>+ 질문 추가하기</button>
        <div>
          {questionList[nowIndex]}
          {lengthList[nowIndex]}
        </div>
      </div>
      <input
        type={'submit'}
        name={'question_submit'}
        value={'지원서 양식 등록하기'}
      />
    </form>
  );
}

export default DepartmentQuestion;
