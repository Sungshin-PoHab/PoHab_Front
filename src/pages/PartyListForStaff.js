import React, { useState, useEffect } from 'react';
import instance from '../utils/axiosConfig'

import "../assets/PartyListForStaff/PartyListForStaff.css"

function PartyListForStaff() {

  const [partyData, setPartyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authorization = window.localStorage.getItem('authorization');

  const getData = async () => {
    try {
      setPartyData(null);
      setError(null);
      setLoading(true);
      const res = await instance.get('http://localhost:8787/party/forStaff', {
        headers: {
          authorization: authorization,
        },
      });
      setPartyData(res.data);
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
  if (!partyData) return null;

  return (
    <div className="wrap_div">
      
    </div>
  );
}

export default PartyListForStaff;
