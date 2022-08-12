import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

function ReadQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [personalQuestions, setPersonalQuestions] = useState('');

  const { party_id } = useParams();
  const description_id = useRef(0);
  const personal_id = useRef(0);

  const deleteQuestion = async (question_id) => {
    if (window.confirm('해당 질문을 정말 삭제하시겠습니까?')) {
      await axios.delete('/question/' + question_id);
    }
  };

  const getDepartments = async () => {
    const res = await axios.get('/recruit/department/' + party_id);

    // 설명 id get
    const description_data = res.data.find((data) => {
      return data.department === '설명';
    });
    description_id.current = description_data.id;
    // 개인정보 id get
    const personal_data = res.data.find((data) => {
      return data.department === '개인정보';
    });
    personal_id.current = personal_data.id;
  };

  const getQuestion = useCallback(async () => {
    // 설명 get
    const description_questions = await axios.get(
      '/question?department=' + description_id.current
    );
    description_questions.data.forEach((data) => {
      if (data.question.startsWith('title'))
        setTitle(data.question.split(' ')[1]);
      else setDescription(data.question.split(' ')[1]);
    });

    // 개인정보 질문 get
    const personal_questions = await axios.get(
      '/question?department=' + personal_id.current
    );
    setPersonalQuestions(
      personal_questions.data.map((data) => {
        return [
          <div>
            <p>{data.question}</p>
            <button>수정</button>
            <button onClick={() => deleteQuestion(data.id)}>삭제</button>
          </div>,
        ];
      })
    );
  }, [deleteQuestion]);

  useEffect(() => {
    getDepartments();
    getQuestion();
  }, [getQuestion]);

  return (
    <div>
      <div>
        <h3>설명 입력</h3>
        <p>지원서 작성 시 제일 상단에 보여집니다.</p>
      </div>
      <div>
        <p>지원서 제목</p>
        {title}
      </div>
      <div>
        <p>설명글 입력</p>
        {description}
      </div>
      <div>
        <h3>개인정보 질문란</h3>
      </div>
      <div>{personalQuestions}</div>
    </div>
  );
}

export default ReadQuestion;
