import React, { useEffect } from 'react';
import instance from '../../utils/axiosConfig';

function Home() {
  const authorization = window.localStorage.getItem('authorization');
  const getData = async () => {
    try {
      const res = await instance.get('/result', {
        headers: {
          authorization: authorization,
        },
      });
      console.log('res ', res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Home</div>;
}

export default Home;
