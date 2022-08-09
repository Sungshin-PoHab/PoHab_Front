import React, { useEffect } from "react";
import axios from "axios";

function Home() {
  const userEmail = window.localStorage.getItem("userEmail");

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8787/header", {
        headers: {
          userEmail: userEmail,
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
