import React from 'react';

function CommonQuestions(props) {
  return (
    <div>
      <h4>{props.question}</h4>
      <p>최대 {props.maxLength}자</p>
      <textarea
        rows={props.maxLength / 20}
        cols={props.maxLength / 5}
        maxLength={props.maxLength}
      ></textarea>
      <br></br>
    </div>
  );
}
export default CommonQuestions;
