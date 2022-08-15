import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import instance from '../../utils/axiosConfig';
import '../../assets/question/ReadQuestion.css';

function ReadQuestion() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [personalQuestions, setPersonalQuestions] = useState('');

  const { party_id } = useParams();
  const description_id = useRef(0);
  const personal_id = useRef(0);

  const deleteQuestion = async (question_id) => {
    if (window.confirm('해당 질문을 정말 삭제하시겠습니까?')) {
      await instance.delete('/question/' + question_id);
    }
  };

  const getDepartments = async () => {
    const res = await instance.get('/recruit/department/' + party_id);

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
    const description_questions = await instance.get(
      '/question?department=' + description_id.current
    );
    description_questions.data.forEach((data) => {
      if (data.question.startsWith('title '))
        setTitle(data.question.split(' ')[1]);
      else setDescription(data.question.split(' ')[1]);
    });

    // 개인정보 질문 get
    const personal_questions = await instance.get(
      '/question?department=' + personal_id.current
    );
    setPersonalQuestions(
      personal_questions.data.map((data) => {
        return [
          <div className={'L-row'}>
            <p>{data.question}</p>
            <button
              className={'L-delete-btn'}
              onClick={() => deleteQuestion(data.id)}
            >
              삭제
            </button>
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
    <div className={'L-container'}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>설명 입력</h3>
        <p className={'L-description-context'}>
          지원서 작성 시 제일 상단에 보여집니다.
        </p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>지원서 제목</p>
        {title}
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>설명글 입력</p>
        {description}
      </div>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>개인정보 질문란</h3>
      </div>
      {personalQuestions}
      <button
        className={'L-button'}
        onClick={() => navigate(`/question/department/${party_id}`)}
      >
        지원서 질문 확인으로 넘어가기 >{' '}
      </button>
    </div>
  );
}

export default ReadQuestion;
