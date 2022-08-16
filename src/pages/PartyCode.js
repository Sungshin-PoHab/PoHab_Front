import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/PartyEnroll/PartyCode.css';

function CodePage() {
  let { code } = useParams();

  return (
    <div class="J_wrap_div">
      <div class="J_title">
        <h2>소속 등록 완료!</h2>
        아래의 운영진을 등록하기 위한 코드를 확인해주세요.<br></br>
        유출되지 않도록 주의가 필요하며, <br></br>페이지를 벗어나면
        <span id="J_alert"> 다시는 조회할 수 없으므로 </span>
        <span> 따로 기록하길 권장합니다.</span>
      </div>
      <div id="J_code">
        <h4 id="J_code_text">{code}</h4>
      </div>
    </div>
  );
}

export default CodePage;
