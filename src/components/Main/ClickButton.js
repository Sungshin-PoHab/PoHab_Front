import React, { useState, useEffect } from 'react';
import Guideline3 from './Guideline3';

function ClickButton(props) {

  return (
    <div>
      <Guideline3 stepDateDtos={ props.stepDateDtos } />
    </div>
  );
}

export default ClickButton;
