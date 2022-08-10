import React, { useEffect } from "react";
import axios from "axios";

function Home() {
  const authorization = window.localStorage.getItem("authorization");
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8787/result", {
        headers: {
          authorization: authorization,
        },
      });
      console.log("res ", res);
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
