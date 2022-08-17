import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ClickButton from '../components/Main/ClickButton';
import TopBar from '../components/Main/TopBar';
import '../assets/Main/Main.css';

function ClickButtonPage(props) {
  
  return (
    <div>
      <TopBar />
      <div className='z-wrap-div' style={{ marginTop: '1%' }}>
        <ClickButton stepDateDtos={ props.stepDateDtos } />
      </div>
    </div>
  );
}

export default ClickButtonPage;
