import React, { useMemo, useEffect, useState } from 'react';
import instance from '../../utils/axiosConfig';

//동아리 지원 내역
function MyParties() {
  const [applies, setApplies] = useState();

  const columns = useMemo(() => [
    {
      accessor: 'partyName',
      Header: '소속',
    },
    {
      accessor: 'department',
      Header: '부서',
    },
    {
      accessor: 'nth',
      Header: '지원 기수',
    },
    {
      accessor: 'step',
      Header: '몇차',
    },
    {
      accesor: 'result',
      Header: '상태',
    },
    {
      accessor: 'application',
      Header: '지원서',
    },
  ]);

  const getData = () => {
    instance
      .post(
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
      )
      .then((res) => {
        console.log('사용자의 지원정보: ', res.data);
        setApplies(res.data);

        return res.data;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return <div></div>;
}
export default MyParties;
