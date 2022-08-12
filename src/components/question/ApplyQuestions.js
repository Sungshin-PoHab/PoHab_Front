import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';
import CommonQuestions from './CommonQuestions';

function ApplyQuestions() {
  const params = useParams();

  const [questNo, setQuestNo] = useState(0);
  const [personalAnswers, setPersonalAnswers] = useState([]);
  const [commonAnswers, setCommonAnswers] = useState([]);
  const [departAnswers, setDepartAnswers] = useState([]);

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  const [personalQuestions, setPersonalQuestions] = useState([]);
  const [commonQuestions, setCommonQuestions] = useState([]);
  const [departQuestions, setDepartQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setDepartQuestions(null);
      setError(null);
      setLoading(true);
      console.log(params.department);
      const res = await instance.get(
        //부서의 질문 가져오기
        `/question/?department=${params.department}`,
        {
          headers: {
            Authorization: window.localStorage.getItem('authorization'),
          },
        }
      );
      console.log('해당 부서의 질문들: ', res);
      const partyId = res.data[0].department.party.id;

      const commonDepRes = await instance.get(`/department/${partyId}`);
      console.log('설명&개인정보&공통부서 정보: ', commonDepRes.data);
      //공통 부서들 가져오기
      console.log('commonDepRes.data[0].id: ', commonDepRes.data[0].id);
      const informDepsId = commonDepRes.data[0].id; //설명 부서 id
      const personalDepsId = commonDepRes.data[1].id; //개인정보 부서 Id
      const commonDepsId = commonDepRes.data[2].id; //공통 부서 id
      console.log('설명 부서 Id: ', informDepsId);

      const informQuesRes = await instance.get(
        `/question/?department=${informDepsId}`
      );
      informQuesRes.data.forEach((data) => {
        if (data.question.startsWith('title'))
          //설명 - 제목 저장
          setTitle(data.question.substring(6));
        else setDescription(data.question.substring(12)); //설명 - 내용 저장
      });

      console.log('설명', informQuesRes.data);

      const personalQuesRes = await instance.get(
        `/question/?department=${personalDepsId}`
      );
      setPersonalQuestions(personalQuesRes.data); //개인정보 질문

      const commonQuesRes = await instance.get(
        `/question/?department=${commonDepsId}`
      );
      setCommonQuestions(commonQuesRes.data); //공통 질문

      // setCommonData(commonQuesResFirst);
      setDepartQuestions(res.data);
      setQuestNo(
        res.data.length +
          personalQuesRes.data.length +
          commonQuesRes.data.length
      );
      console.log('res ', res);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  //사용자의 기존 답변 가져오기
  const getAnswer = async () => {
    try {
      const res = await instance.get(
        `/answer/${params.department}/${params.step}`,
        {
          headers: {
            Authorization: window.localStorage.getItem('authorization'),
          },
        }
      );
      //답변 질문 번호 순서대로 정렬
      const pastAnswers = res.data.sort(function (a, b) {
        return a.question.id - b.question.id;
      });
      pastAnswers.forEach((answer) => {
        const department = answer.question.department.department;
        console.log(department);
        if (department == '개인정보') {
          setPersonalAnswers(personalAnswers.push(answer));
        } else if (department == '공통') {
          setCommonAnswers(commonAnswers.push(answer));
        } else {
          setDepartAnswers(departAnswers.push(answer));
        }
      });

      console.log('개인 정보 답변', personalAnswers);
      console.log('공통 질문 답변', commonAnswers);
      console.log('부서 질문 답변', departAnswers);
      console.log('회원의 답변', res.data);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    getAnswer();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!departQuestions) return null;

  // 임시 저장
  const tempSubmit = () => {
    const newanswers = new Array();
    for (let i = 0; i < questNo; i++) {
      const newanswer = document.getElementById(i).value;
      console.log(newanswer);
      newanswers.push(newanswer);
    }
    console.log(questNo);
  };
  // 최종 제출
  const submit = () => {
    console.log('제출');
  };

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <h2>개인 정보 입력</h2>
        {personalQuestions.map((data, index) => (
          <div>
            <h4>
              {index + 1}. {data.question}
            </h4>
            {/* <p>최대 {data.maxLength}자</p> */}
            <input
              id={index}
              rows="1"
              cols="60"
              maxLength={data.maxLength}
            ></input>
            <br></br>
          </div>
        ))}
      </div>
      <hr></hr>
      <div>
        <h2>공통 질문</h2>
        {commonQuestions.map((data, index) => (
          <div>
            <h4>
              {index + 1 + personalQuestions.length}. {data.question}
            </h4>
            <p>최대 {data.maxLength}자</p>
            <textarea
              id={index + personalQuestions.length}
              rows="20"
              cols="60"
              maxLength={data.maxLength}
            ></textarea>
            <br></br>
          </div>
        ))}
      </div>
      <hr></hr>
      <div>
        <h2>부서별 질문</h2>
        {departQuestions.map((data, index) => (
          <div>
            <h4>
              {index + personalQuestions.length + commonQuestions.length + 1}.{' '}
              {data.question}
            </h4>
            <p>최대 {data.maxLength}자</p>
            <textarea
              id={index + commonQuestions.length + personalQuestions.length}
              rows="20"
              cols="60"
              maxLength={data.maxLength}
            ></textarea>
            <br></br>
          </div>
        ))}
      </div>
      <button onClick={tempSubmit}>임시저장하기</button>
      <button onClick={submit}>제출하기</button>
    </div>
  );
}

export default ApplyQuestions;
