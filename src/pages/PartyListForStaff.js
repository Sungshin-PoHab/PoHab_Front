import React, { useState, useEffect } from 'react';
import instance from '../utils/axiosConfig'
import { useParams } from 'react-router-dom';

import PartyList from '../components/PartyListForStaff/PartyList';
import "../assets/PartyListForStaff/PartyListForStaff.css"
import "../assets/Main/Main.css"

function PartyListForStaff() {

  let params = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authorization = window.localStorage.getItem('authorization');

  const getData = async () => {
    try {
      setData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get(`/party/staff`, {
        headers: {
          authorization: authorization,
        },
      });
      setData(res.data);
      console.log('res ', res);
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
  if (!data) return null;

  let odd = 'odd';
  let key = 1;

  return (
    <div style={{ marginTop: '50px' }}>
      {/* <PartyList hashMap={data} isOddNum={odd+(key++%2)} /> */}
      {data.map(data => (
        <PartyList partyId={ data.partyId } departmentId={ data.departmentId } 
          stepId={ data.stepId } role={ data.role } isOddNum={odd+(key++%2)}/>
      ))}
      {/* {data.map(data => (
        <PartyList partyId={data.id} isOddNum={odd+(key++%2)} />
      ))} */}
    </div>
  );
}

export default PartyListForStaff;
