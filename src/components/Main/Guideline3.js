import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosConfig';

import '../../assets/GradingStatusForStaff/Guideline.css';

function Guideline3(props) {
  const [mainData, setMainData] = useState(null);
  const [result, setResult] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let params = useParams();

  const authorization = window.localStorage.getItem('authorization');

  const getData = async () => {
    try {
      setMainData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get('/main', {
        headers: {
          authorization: authorization,
        },
      });
      setMainData(res.data);
      console.log('res ', res);

      const temp = res.data.filter((data) => data.party == params.party);
      setResult(temp);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!mainData) return null;

  const onClick = () => {
    window.location.href = `http://localhsot:5000/apply/:department/:step`;
  };

  const deClick = (value) => {
    console.log(value);
  };

  const saveStatus = (data, step) => {
    //partyid랑 step(1)으로 id 찾기 ==> 해당 파티의 step 불러오고 그 중에 step==1 인 것의 id 찾기
    const partyId = params.party;
    instance.get(`recruit/step/first/${partyId}`).then((firstStepRes) => {
      const firstStep = firstStepRes.data.id;
      console.log('firstStepRes:', firstStepRes.data);

      console.log('data', data);
      const body = {
        department: data.id,
        step: firstStep,
        user: 0,
      };
      console.log(body);
      instance
        .post(`/apply/saveStatus`, body, {
          headers: {
            Authorization: window.localStorage.getItem('authorization'),
          },
        })
        .then((res) => {
          console.log(res); //data.id: departmentid //step: 단계
          window.open(`http://localhost:5000/apply/${data.id}/${firstStep}`);
        });
    });
  };

  return (
    <div>
      <div className="z-guide-div" style={{ height: 'fit-content', paddingBottom: '4%', fontSize: '0.9em' }}>
        <h4 className="z-guide-h4" style={{ lineHeight: '250%', fontWeight: '800', fontSize: '1.2em' }}>
          {params.party}기 신입 리크루팅
        </h4>
        <p className="z-guide-p" style={{ marginTop: '1%' }}>
          저희 동아리에 지원해 주셔서 진심으로 감사드립니다.
        </p>
        <p className="z-guide-p" style={{ margin: '0' }}>
          동아리 지원시 유의사항 안내드립니다.
        </p>
        <div style={{ padding: '1%' }}></div>
        {result[0].stepDateDtos.map((data) => (
          <div>
            <p className="z-guide-p">
              {data.step} 단계 마감은 {data.endDate} {data.endTime} {data.pmAm} 까지 입니다. 꼭 시간 안에 제출해주세요!
            </p>
          </div>
        ))}
        <p style={{ fontWeight: '600', marginTop: '3%' }}>지원서 작성하러 가기</p>
        {result[0].departmentList.map((data) => (
          // <button onClick={=>  window.open(`http://localhost:5000/apply/${data.id}/${result[0].stepDateDtos[0].step}`) } className='z-button' style={{ width: 'fit-content', marginLeft: '0', marginRight: '2%' }}>{ data. department }</button>
          <button
            onClick={() => window.location.href=`http://localhost:5000/question/create/${params.party}`}
            className="z-button"
            style={{ width: 'fit-content', marginLeft: '0', marginRight: '2%' }}
          >
            {data.department}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px' }}></div>
    </div>
  );
}

export default Guideline3;
