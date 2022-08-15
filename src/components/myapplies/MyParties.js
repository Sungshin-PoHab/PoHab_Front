import React, { useEffect, useState } from 'react';
import instance from '../../utils/axiosConfig';
import '../../assets/MyApplies/MyApplies.css';
//동아리 지원 내역
function MyParties() {
  const [applies, setApplies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [application, setApplications] = useState(null);

  const getData = async () => {
    setError(null);
    setApplies(null);
    setLoading(true);
    try {
      const res = await instance.post(
        `apply/myApply`,
        {
          id: 1,
          name: '정준서',
          email: 'kjmj13@navaer.com',
        },
        {
          headers: {
            Authorization: window.localStorage.getItem('authorization'),
          },
        }
      );

      const applyArray = new Array();
      const applicationArray = new Array();
      res.data.map((data) => {
        applyArray.push({
          partyName: data.department.party.id.split('-')[0],
          department: data.department.department,
          nth: data.department.party.id.split('-')[1],
          step: data.step.id,
          result: data.is_pass,
        });
        if (data.step.id == 1) {
          applicationArray.push({
            partyName: data.department.party.id.split('-')[0],
            department: data.department.department,
            nth: data.department.party.id.split('-')[1],
            state: data.is_submit,
            result: data.is_pass,
            endDate: data.step.endDate.split('T')[0] + ' ' + data.step.endDate.split('T')[1],
            application: '/question/' + data.department.id + '/' + data.step.id,
          });
        }
      });
      setApplies(applyArray);
      setApplications(applicationArray);
      // console.log('사용자의 지원정보: ', res.data);
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
  if (!applies) return null;

  return (
    <div class="J_wrap_div">
      <div class="J_title">
        <h2>내 지원 목록 확인</h2>
      </div>
      <table class="J_table" id="J_table1">
        <thead class="J_thead">
          <th>소속</th>
          <th>부서</th>
          <th>지원 기수</th>
          <th>단계</th>
          <th>결과</th>
        </thead>
        {applies.map((data) => (
          <tr>
            <td>{data.partyName}</td>
            <td>{data.department}</td>
            <td>{data.nth}</td>
            <td>{data.step}</td>
            <td>{data.result}</td>
          </tr>
        ))}
      </table>
      <div class="J_title">
        <h2>내 지원서 확인</h2>
      </div>
      <table class="J_table">
        <thead class="J_thead">
          <th>소속</th>
          <th>부서</th>
          <th>기수</th>
          <th>제출 상태</th>
          <th>결과</th>
          <th>제출 기한</th>
          <th>지원서</th>
        </thead>

        {application.map((data) => (
          <tr>
            <td>{data.partyName}</td>
            <td>{data.department}</td>
            <td>{data.nth}</td>
            <td>{data.state}</td>
            <td>{data.result}</td>
            <td>{data.endDate}</td>
            <td>
              <a href={data.application}>보러 가기</a>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
//         <Route path="/question/:department/:step" element={Auth(Questions, true)} />

export default MyParties;
