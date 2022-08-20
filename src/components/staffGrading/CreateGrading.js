import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';
import '../../assets/CreateGrading.css';
import CreateReadChat from '../chat/CreateReadChat';

function CreateGrading() {
  const [standardList, setStandardList] = useState(new Map());
  const [scoreList, setScoreList] = useState(new Map());
  const [departments, setDepartments] = useState([]);
  const [nowIndex, setNowIndex] = useState(0);
  const [answers, setAnswers] = useState(null);

  const { apply_id } = useParams();

  const fetchDepartmentAndStandard = async () => {
    const answer = await instance.get(`/grading/apply/${apply_id}`);
    setAnswers(answer.data);
    const apply_status = answer.data[0].applyStatus;
    const step_id = apply_status.step.id;
    const party_id = apply_status.department.party.id;

    // department 버튼 설정
    const res = await instance.get(`/recruit/department/${party_id}`);
    let data = res.data;
    data = data.filter((data) => data.department !== '개인정보');
    data = data.filter((data) => data.department !== '설명');
    data.map((data) => {
      standardList.set(data.id, []);
    });
    data = data.filter((data) => data.department === '공통');
    data = [...data, apply_status.department];
    setDepartments(data);

    // 현재 인덱스 설정
    // setNowIndex(
    //   data.find((data) => {
    //     return data.department === '공통';
    //   }).id
    // );

    // 채점 기준 fetch
    const standards = await instance.get(`/standard/${step_id}`);
    for (let i = 0; i < standards.data.length; i++) {
      standardList.set(standards.data[i].department.id, [
        ...standardList.get(standards.data[i].department.id),
        standards.data[i],
      ]);
    }
    console.log(standardList);
  };

  const renderDepartments = (departments) => {
    return departments.map((department) => {
      return [
        <button className={'L-department-btn'} onClick={(event) => handleDepartClick(event, department.id)}>
          {department.department}
        </button>,
      ];
    });
  };

  const renderStandard = (standardList, nowIndex, scoreList) => {
    console.log('standardList: ', standardList);
    console.log('nowIndex:', nowIndex);
    console.log('scoreList: ', scoreList);
    if (nowIndex === 0) return [];
    return standardList.get(nowIndex).map((standard) => {
      return [
        <div>
          <p>{standard.gradingStandard}</p>
          <div>
            <label>
              <input
                type={'radio'}
                onChange={(event) => handleScoreClick(event, standard.id, scoreList)}
                checked={scoreList.get(standard.id) === '1'}
                value={1}
                name={`standard${standard.id}`}
              />
              1점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) => handleScoreClick(event, standard.id, scoreList)}
                checked={scoreList.get(standard.id) === '2'}
                value={2}
                name={`standard${standard.id}`}
              />
              2점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) => handleScoreClick(event, standard.id, scoreList)}
                checked={scoreList.get(standard.id) === '3'}
                value={3}
                name={`standard${standard.id}`}
              />
              3점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) => handleScoreClick(event, standard.id, scoreList)}
                checked={scoreList.get(standard.id) === '4'}
                value={4}
                name={`standard${standard.id}`}
              />
              4점
            </label>
            <label>
              <input
                type={'radio'}
                onChange={(event) => handleScoreClick(event, standard.id, scoreList)}
                checked={scoreList.get(standard.id) === '5'}
                value={5}
                name={`standard${standard.id}`}
              />
              5점
            </label>
          </div>
        </div>,
      ];
    });
  };

  const handleDepartClick = (event, data_id) => {
    event.preventDefault();
    setNowIndex(data_id);
  };

  const handleScoreClick = (event, standard_id, scoreList) => {
    const value = event.target.value;
    setScoreList(new Map([...scoreList, [standard_id, value]]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = [];

    for (let [key, value] of scoreList) {
      body.push({
        standardId: key,
        score: value,
      });
    }

    const res = await instance.post(`/grading/${apply_id}`, body, {
      headers: {
        Authorization: window.localStorage.getItem('authorization'),
      },
    });
    if (res.status === 200) {
      // 추후 경로 설정 해야됨.. redirect
      console.log(res.data);
      // 여기도 지원서 관리 (동아리 유진) 페이지로 못 넘어가서 아직 설정 못함 추후에 부탁
    }
  };

  const renderAnswers = () => {
    if (answers != null) {
      var personalAnswers = [];
      var commonAnswers = [];
      var departAnswers = [];
      // 답변 질문 번호 순서대로 정렬
      const pastAnswers = answers.sort(function (a, b) {
        return a.question.id - b.question.id;
      });
      console.log('정렬한 answers:', pastAnswers);
      pastAnswers.forEach((answer) => {
        const department = answer.question.department.department;
        // setApplyStatusId((applyStatusId) => answer.applyStatus.id);
        if (department == '개인정보') {
          personalAnswers = [...personalAnswers, answer];
        } else if (department == '공통') {
          commonAnswers = [...commonAnswers, answer];
        } else {
          departAnswers = [...departAnswers, answer];
        }
      });

      console.log('personalAnswers:', personalAnswers);
      console.log('commonAnswers:', commonAnswers);
      console.log('departAnswers:', departAnswers);

      return (
        <div>
          <div class="L-container">
            <div class="L-description">
              <h3 className={'L-description-title'}>개인 정보</h3>
            </div>
            {personalAnswers.map((data, index) => (
              <div class="J_form">
                <h4>
                  {index + 1}. {data.question.question}
                </h4>
                <span clas="J_answer">{data.answer}</span>
                <br></br> <br></br>
              </div>
            ))}
          </div>
          <div class="L-container">
            <div class="L-description">
              <h3 className={'L-description-title'}>공통 질문</h3>
            </div>
            {commonAnswers.map((data, index) => (
              <div class="J_form">
                <h4>
                  {index + 1 + personalAnswers.length}. {data.question.question}
                </h4>
                <span class="J_answer">{data.answer}</span>
                <br></br> <br></br>
              </div>
            ))}
          </div>
          <div class="L-container">
            <div class="L-description">
              <h3 className={'L-description-title'}>{departAnswers[0].applyStatus.department.department} 부서 질문</h3>
            </div>
            {departAnswers.map((data, index) => (
              <div class="J_form">
                <h4>
                  {index + personalAnswers.length + commonAnswers.length + 1}. {data.question.question}
                </h4>
                <span class="J_answer">{data.answer}</span>
                <br></br> <br></br>
              </div>
            ))}
          </div>{' '}
        </div>
      );
    }
  };

  useEffect(() => {
    fetchDepartmentAndStandard();
  }, []);

  return (
    <div>
      {renderAnswers()}
      <div></div>
      <CreateReadChat />
      <form className={'L-container'} onSubmit={handleSubmit}>
        <div className={'L-description'}>
          <h3 className={'L-description-title'}>부서별 채점 기준 선택</h3>
        </div>
        <div className={'L-department'}>
          <p>모집 부서</p>
          {renderDepartments(departments)}
        </div>
        <div className={'L-description'}>
          <h3 className={'L-description-title'}>질문</h3>
        </div>
        <div className={'L-standard-list'}>{renderStandard(standardList, nowIndex, scoreList)}</div>
        <input className={'L-submit'} type={'submit'} value={'채점 완료하기'} />
      </form>
    </div>
  );
}

export default CreateGrading;
