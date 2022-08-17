import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';
import '../../assets/question/CreateQuestion.css';

function CreateQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [personal, setPersonal] = useState('');
  const [personalQuestion, setPersonalQuestion] = useState([]);

  let description_id;
  let personal_id;
  const { party_id } = useParams();

  const getDepartment = async () => {
    const res = await instance.get('/recruit/department/' + party_id);

    // 설명 id get
    const description_data = res.data.find((data) => {
      return data.department === '설명';
    });
    description_id = description_data.id;
    // 개인정보 id get
    const personal_data = res.data.find((data) => {
      return data.department === '개인정보';
    });
    personal_id = personal_data.id;
  };

  useEffect(() => {
    getDepartment();
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'title') setTitle(value);
    else if (name === 'personal') setPersonal(value);
    else setDescription(value);
  };

  const handlePlusClick = (event) => {
    event.preventDefault();

    if (personal === '') alert('질문을 입력하세요.');
    else {
      setPersonalQuestion(personalQuestion.concat(<p className={'L-p'}>{personal}</p>));
      setPersonal('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = [];
    body.push(
      {
        departmentId: description_id,
        question: 'title ' + title,
        maxLength: 0,
      },
      {
        departmentId: description_id,
        question: 'description ' + description,
        maxLength: 0,
      }
    );

    for (let i = 0; i < personalQuestion.length; i++) {
      body.push({
        departmentId: personal_id,
        question: personalQuestion[i].props.children,
        maxLength: 100,
      });
    }

    const res = await instance.post('/question', body);
    console.log(res.data);
    document.location.replace('/recruit/department/' + party_id);
  };

  return (
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>설명 입력</h3>
        <p className={'L-description-context'}>지원서 작성 시 제일 상단에 보여집니다.</p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>지원서 제목</p>
        <input className={'L-input-text'} type={'text'} name={'title'} onChange={handleChange} value={title} />
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>설명글 입력</p>
        <input
          className={'L-input-textarea'}
          type={'text'}
          name={'description'}
          onChange={handleChange}
          value={description}
        />
      </div>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>개인정보 질문란</h3>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>질문 입력</p>
        <input className={'L-input-text'} type={'text'} name={'personal'} onChange={handleChange} value={personal} />
      </div>
      <button className={'L-button'} onClick={handlePlusClick}>
        + 개인정보 질문 추가하기
      </button>
      {personalQuestion}
      <input
        className={'L-submit'}
        type={'submit'}
        name={'description_submit'}
        value={'지원서 질문 작성으로 넘어가기 >'}
      />
    </form>
  );
}

export default CreateQuestion;
