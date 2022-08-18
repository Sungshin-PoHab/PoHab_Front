import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';
import '../../assets/Apply/ApplyQuestion.css';
function ApplyQuestions() {
  const params = useParams();

  const [personalAnswers, setPersonalAnswers] = useState([]);
  const [commonAnswers, setCommonAnswers] = useState([]);
  const [departAnswers, setDepartAnswers] = useState([]);

  const [personalAnswersId, setPersonalAnswersId] = useState([]);
  const [commonAnswersId, setCommonAnswersId] = useState([]);
  const [departAnswersId, setDepartAnswersId] = useState([]);

  const [applyStatusId, setApplyStatusId] = useState(0);

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  const [ansNo, setAnsNo] = useState(0);
  const [personalQuestionsId, setPersonalQuestionsId] = useState([]);
  const [commonQuestionsId, setCommonQuestionsId] = useState([]);
  const [departQuestionsId, setDepartQuestionsId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      // console.log(params.department);
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
      // console.log('commonDepRes.data[0].id: ', commonDepRes.data[0].id);
      const informDepsId = commonDepRes.data[0].id; //설명 부서 id
      // console.log('설명 부서 Id: ', informDepsId);

      //설명 부서 질문 가져오기
      const informQuesRes = await instance.get(`/question/?department=${informDepsId}`);
      informQuesRes.data.map((data) => {
        if (data.question.startsWith('title')) {
          setTitle(data.question.substring(5));
        } else {
          setDescription(data.question.substring(11));
        }
      });
      // console.log('설명', informQuesRes.data);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  //사용자의 기존 답변 가져오기
  const getAnswer = async () => {
    try {
      const res = await instance.get(`/answer/${params.department}/${params.step}`, {
        headers: {
          Authorization: window.localStorage.getItem('authorization'),
        },
      });
      //답변 질문 번호 순서대로 정렬
      const pastAnswers = res.data.sort(function (a, b) {
        return a.question.id - b.question.id;
      });
      console.log(pastAnswers);
      pastAnswers.forEach((answer) => {
        const department = answer.question.department.department;
        setApplyStatusId((applyStatusId) => answer.applyStatus.id);
        if (department == '개인정보') {
          setPersonalAnswers((personalAnswers) => [...personalAnswers, answer]);
          setPersonalAnswersId((personalAnswersId) => [...personalAnswersId, answer.id]);
          setPersonalQuestionsId((personalQuestionsId) => [...personalQuestionsId, answer.question.id]);
        } else if (department == '공통') {
          setCommonAnswers((commonAnswers) => [...commonAnswers, answer]);
          setCommonAnswersId((commonAnswersId) => [...commonAnswersId, answer.id]);
          setCommonQuestionsId((commonQuestionsId) => [...commonQuestionsId, answer.question.id]);
        } else {
          setDepartAnswers((departAnswers) => [...departAnswers, answer]);
          setDepartAnswersId((departAnswersId) => [...departAnswersId, answer.id]);
          setDepartQuestionsId((departQuestionsId) => [...departQuestionsId, answer.question.id]);
        }
      });

      setAnsNo((ansNo) => res.data.length);
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

  const answersToObject = () => {
    const newanswers = new Array();

    const allAnswersId = personalAnswersId.concat(commonAnswersId).concat(departAnswersId);
    console.log(allAnswersId);

    const allQuestsId = personalQuestionsId.concat(commonQuestionsId).concat(departQuestionsId);
    console.log(allQuestsId);

    for (let i = 0; i < ansNo; i++) {
      const answerObject = new Object();
      answerObject['id'] = allAnswersId[i];
      answerObject['answer'] = document.getElementById(i).value;
      answerObject['apply_id'] = applyStatusId;
      answerObject['question_id'] = allQuestsId[i];

      newanswers.push(answerObject);
    }

    return newanswers;
  };
  // 임시 저장
  const tempSubmit = () => {
    const res = instance
      .post(`/answer/tempSave`, answersToObject(), {
        headers: {
          Authorization: window.localStorage.getItem('authorization'),
        },
      })
      .then((res) => {
        console.log(res);
        alert('임시저장을 완료했습니다');
        window.location.href = `http://13.124.177.111:5000/user/myApply`;
      });
  };
  // 최종 제출
  const submit = () => {
    console.log('제출');
    const res = instance
      .post(`/apply/${params.department}/${params.step}`, answersToObject(), {
        headers: {
          Authorization: window.localStorage.getItem('authorization'),
        },
      })
      .then((res) => {
        console.log(res);
        alert('제출을 완료했습니다');
        window.location.href = `http://13.124.177.111:5000/user/myApply`;
      });
  };

  return (
    <div class="J_wrap_div">
      <div class="J_title">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <h2 class="J_title">개인 정보 입력</h2>
        {personalAnswers.map((data, index) => (
          <div class="J_form">
            <h4>
              {index + 1}. {data.question.question}
            </h4>
            {/* <p>최대 {data.maxLength}자</p> */}
            <input
              class="J_input"
              id={index}
              rows="1"
              cols="60"
              maxLength={data.question.maxLength}
              defaultValue={data.answer}
            ></input>
            <br></br>
          </div>
        ))}
      </div>
      <div>
        <h2 class="J_title">공통 질문</h2>
        {commonAnswers.map((data, index) => (
          <div class="J_form">
            <h4>
              {index + 1 + personalAnswers.length}. {data.question.question}
            </h4>
            <p class="J_maxlength">(최대 {data.question.maxLength}자)</p>
            <textarea
              class="J_textarea"
              id={index + personalAnswers.length}
              rows="20"
              cols="60"
              maxLength={data.question.maxLength}
              defaultValue={data.answer}
            ></textarea>
            <br></br>
          </div>
        ))}
      </div>
      <div>
        <h2 class="J_title">부서별 질문</h2>
        {departAnswers.map((data, index) => (
          <div class="J_form">
            <h4>
              {index + personalAnswers.length + commonAnswers.length + 1}. {data.question.question}
            </h4>
            <p class="J_maxlength">(최대 {data.question.maxLength}자)</p>
            <textarea
              class="J_textarea"
              id={index + commonAnswers.length + personalAnswers.length}
              rows="20"
              cols="60"
              maxLength={data.question.maxLength}
              defaultValue={data.answer}
            ></textarea>
            <br></br>
          </div>
        ))}
      </div>
      <div class="J_button_div">
        <button class="J_button" onClick={tempSubmit}>
          임시저장하기
        </button>
        <button class="J_button" id="J_button_right" onClick={submit}>
          제출하기
        </button>
      </div>
    </div>
  );
}

export default ApplyQuestions;
