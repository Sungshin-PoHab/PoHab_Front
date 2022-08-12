import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CreateQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [personal, setPersonal] = useState('');
  const [personalQuestion, setPersonalQuestion] = useState([]);

  let description_id;
  let personal_id;
  const { party_id } = useParams();

  const getDepartment = async () => {
    const res = await axios.get('/recruit/department/' + party_id);

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

    setPersonalQuestion(personalQuestion.concat(<p>{personal}</p>));
    setPersonal('');
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

    // const res = await axios.post('/question', body);
    // console.log(res.data);
    document.location.replace('department/' + party_id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>설명 입력</h3>
        <p>지원서 작성 시 제일 상단에 보여집니다.</p>
      </div>
      <div>
        <p>지원서 제목</p>
        <input
          type={'text'}
          name={'title'}
          onChange={handleChange}
          value={title}
        />
      </div>
      <div>
        <p>설명글 입력</p>
        <input
          type={'text'}
          name={'description'}
          onChange={handleChange}
          value={description}
        />
      </div>
      <div>
        <h3>개인정보 질문란</h3>
      </div>
      <div>
        <div>
          <p>질문 입력</p>
          <input
            type={'text'}
            name={'personal'}
            onChange={handleChange}
            value={personal}
          />
        </div>
        <button onClick={handlePlusClick}>+ 개인정보 질문 추가하기</button>
        {personalQuestion}
      </div>
      <input
        type={'submit'}
        name={'description_submit'}
        value={'지원서 질문 작성으로 넘어가기 >'}
      />
    </form>
  );
}

export default CreateQuestion;
