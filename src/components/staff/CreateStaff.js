import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../utils/axiosConfig';
import '../../assets/staff/CreateStaff.css';

function CreateStaff() {
  const [role, setRole] = useState('');
  const [code, setCode] = useState('');

  const { party_id } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'roleInput') setRole(value);
    else setCode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await instance
      .post(
        '/staff/' + party_id,
        {
          role: role,
          code: code,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem('authorization'),
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 400) {
          // 등록 실패 (코드 오류)
          alert('코드가 잘못됐습니다. 다시 입력해주세요.');
          setCode('');
        }
      });

    if (res.status === 200) {
      // 등록 성공
      alert(`${res.data.party.name}에 ${role}로 등록됐습니다.`);
      console.log(res.data);
      navigate('/staff/read/' + res.data.party.id);
    }
  };

  return (
    <form className={'L-container'} onSubmit={handleSubmit}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>운영진 등록</h3>
        <p className={'L-description-context'}>
          소속을 관리하는 운영진을 등록합니다.
        </p>
        <p className={'L-description-context'}>
          소속 생성 시 발급받은 코드를 통해 등록할 수 있습니다.
        </p>
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>역할</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'roleInput'}
          onChange={handleChange}
          value={role}
        />
      </div>
      <div className={'L-col'}>
        <p className={'L-p'}>코드</p>
        <input
          className={'L-input-text'}
          type={'text'}
          name={'codeInput'}
          onChange={handleChange}
          value={code}
        />
      </div>
      <input className={'L-submit'} type={'submit'} value={'등록하기'} />
    </form>
  );
}

export default CreateStaff;
