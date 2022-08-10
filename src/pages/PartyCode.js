import React from "react";
import { useParams } from "react-router-dom";

function CodePage() {
  let { code } = useParams();
  const fontStyle = {
    color: "red",
  };
  return (
    <div>
      <h2>소속 등록이 완료되었습니다.</h2>
      <h1>{code}</h1>
      <h4>
        운영진을 등록하기 위한 코드입니다.<br></br>
        유출되지 않도록 주의가 필요합니다.
      </h4>
      <h4 style={fontStyle}>다시는 조회할 수 없으므로 따로 기록해 두십시오.</h4>
    </div>
  );
}

export default CodePage;
