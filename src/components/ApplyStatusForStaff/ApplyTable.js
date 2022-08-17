import '../../assets/ApplyStatusForStaff/ApplyTable.css';

function ApplyTable(props) {

  let key = 0;

  return (
    <div>
      <div style={{ height: '30px' }}></div>
      <table className='z-table'>
      <tr>
        <td className='z-td'>지원자 명</td>
        <td className='z-td'>점수 현황</td>
        <td className='z-td'>채점 현황</td>
        <td className='z-td'>지원서</td>
        </tr>
        <div className='z-padding'></div>  
        {props.applicants.map( data => (
          <tr key={ key++ }>
            <td className='z-td'>{ data.name }</td>
            <td className='z-td'>{ data.score }</td>
            <td className='z-td'>{ data.scoredStaffNum }</td>
            <a href={'http://localhost:5000/apply/' + props.department + '/' + props.step} style={{ textDecoration: 'none' }}>채점하기</a>
          </tr>
        ))} 
       </table>
    </div>
  );
}

export default ApplyTable;