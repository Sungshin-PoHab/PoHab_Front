import React from 'react';

import logoPng from '../../assets/Login/LogoPng.png'
import '../../assets/Main/TopBar.css';

function TopBar(props) {
  return (
    <div>
      <nav id='nav3'>
        <a href='#'><img className='z-top-img' src={ logoPng }/></a>
        <ul>
          <li><a href='#' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>모집 공고 보기</a></li>
          <li><a href='#' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>내 지원 목록 확인</a></li>
          <li><a href='http://localhost:3000/party/staff' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>내 동아리 보기</a></li>
        </ul>
     </nav>
    </div>
  )
}

export default TopBar;