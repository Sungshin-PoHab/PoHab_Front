import { useState } from 'react';
import instance from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';

import '../../assets/GradingStatusForStaff/GradingTable.css';

function GradingTable(props) {

  let params = useParams();
  let key = 1;

  const [passList, setPassList] = useState(new Set());

  const checkedItemHandler = (id, isChecked) => {
  if (isChecked) {
    passList.add(id);
    setPassList(passList);
    console.log(passList);
  } else if (!isChecked && passList.has(id)) {
    passList.delete(id);
    setPassList(passList);
    console.log(passList);
    }
  };

  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(target.value, target.checked);
  };

  async function onSubmit() {
    const data = Array.from(passList);
    console.log(data);
    let res = await instance.post(`http://localhost:8787/grading/announcePNP/${params.department}/${params.step}`, data,
    {
      headers: { "Content-Type": 'application/json'}
    }
    ).then((res) => {
       console.log(res);
    });
  }

  return (
    <div>
      <h4 className='status-h4'>지원자 목록 및 최종 점수</h4>
      <form method="post">
      <table>
      <tr>
        <td>순위</td>
        <td>지원자 명</td>
        <td>최종 점수</td>
        <td>최저/최고 점수</td>
        <td>합격 여부</td>
        </tr>
        <hr></hr>

        <div className='padding'></div>  
          {props.applicantGradingDtoList.map( data => (
            <tr key={ key++ }>
              <td>{ key }</td>
              <td>{ data.name }</td>
              <td>{ data.score }</td>
              <td>{ data.highScore } / { data.lowestScore }</td>
              <td>
                <input type='checkbox' className='full-button' onChange={(e) => checkHandler(e)} value={ data.applyId }></input> 
              </td>
            </tr>
          ))}
        <div>
        </div>
      </table>
      <input type="submit" value="submit" onClick={ onSubmit } ></input>
      </form>
    </div>
  );
}

export default GradingTable ;