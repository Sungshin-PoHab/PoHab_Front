import { useRef, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';

function ReadDepartmentQuestion() {
  const [questionList, setQuestionList] = useState([]);
  const [departments, setDepartments] = useState('');
  const [nowIndex, setNowIndex] = useState(0);
  const [question, setQuestion] = useState('');

  const department_ids = useRef([]);
  const { party_id } = useParams();

  const deleteQuestion = async (event, question_id) => {
    event.preventDefault();

    if (window.confirm('해당 질문을 정말 삭제하시겠습니까?')) {
      // await instance.delete('/question/' + question_id);
      alert('삭제했습니다.');
    }
  };

  const handleDepartmentClick = (event, department_id) => {
    event.preventDefault();

    setNowIndex(department_id);
  };

  const getDepartments = async () => {
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
            <button onClick={(event) => handleDepartmentClick(event, data.id)}>
              {data.department}
            </button>,
          ];
        }
      })
    );

    setQuestionList([...Array(max_id + 1)].map(() => Array(0)));
  };

  const fetchQuestions = async (nowIndex) => {
    console.log('rerender');
    const res = await instance.get('/question/' + party_id);
    if (res.status !== 200) {
      console.error('error!');
    }

    setQuestion(
      res.data.map((data) => {
        if (data.department.id === nowIndex) {
          return [
            <div>
              <p>{data.question}</p>
              <p>{data.maxLength}</p>
              <button onClick={(event) => deleteQuestion(event, data.id)}>
                삭제
              </button>
            </div>,
          ];
        }
      })
    );
  };

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    fetchQuestions(nowIndex);
  }, [nowIndex]);

  return (
    <div>
      <div>
        <h3>모집 부서 지정</h3>
        <p>무집 부서 별로 지원서 질문을 다르게 지정할 수 있습니다.</p>
      </div>
      <div>
        <p>카테고리</p>
        {departments}
      </div>
      <div>{question}</div>
    </div>
  );
}

export default ReadDepartmentQuestion;
