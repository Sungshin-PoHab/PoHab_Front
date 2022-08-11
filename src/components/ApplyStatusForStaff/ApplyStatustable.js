import './ApplyStatusTable.css';

function ApplyStatusTable(props) {

  let key = 0;

  return (
    <div>
      <table>
      <tr>
        <td>지원자 명</td>
        <td>점수 현황</td>
        <td>채점 현황</td>
        <td>지원서</td>
        </tr>
        <hr></hr>

        <div className='padding'></div>  
                      
          {props.applicants.map( data => (
            <tr key={ key++ }>
              <td>{ data.name }</td>
              <td>{ data.score }</td>
              <td>{ data.scoredStaffNum }</td>
              <a href='링크1'>보러 가기</a>
            </tr>
          ))}
      </table>
    </div>

  );
}

export default ApplyStatusTable;