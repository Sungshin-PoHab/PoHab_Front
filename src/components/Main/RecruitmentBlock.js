import React from 'react';
import '../../assets/Main/RecruitmentBlock.css';
import '../../assets/Main/Main.css';

function RecruitmentBlock(props) {
  const onClick = () => {
    window.location.href = `http://frontserver:5000/ClickButton/${props.party}`;
  };

  return (
    <div>
      <div className={props.isOddNum} style={{ height: '170px' }}>
        <button className="z-box-button" onClick={onClick}>
          <div className="z-availability-div">
            <p style={{ height: '5px' }}>{props.availability ? '모집중' : '모집마감'}</p>
          </div>
          <div className="z-party-div">
            <h3 className="z-party-name" style={{ fontSize: 'large' }}>
              {props.party.split('-')[0] + '  ' + props.party.split('-')[1] + '기'}{' '}
            </h3>
            <p className="z-department-p">
              {props.department.map((data) => (
                <p className="z-department-p"> {data}</p>
              ))}
            </p>
            <div className="z-competition-div">
              {props.competition.map((data) => (
                <p className="z-competition-props">{data}</p>
              ))}{' '}
            </div>
          </div>
          <div className="z-date-div">
            {props.stepDateDtos.map((data) => (
              <div>
                <p className="z-step-p">{data.step}단계 </p>
                <p className="z-date-p">
                  모집 기한: {data.startDate} ~ {data.endDate} {data.endTime} {data.pmAm}{' '}
                </p>
                <p className="z-date-p" style={{ color: '#6abebe', fontWeight: '900' }}>
                  {data.availability ? '모집중' : '모집마감'}
                </p>
              </div>
            ))}
          </div>
        </button>
      </div>
      {props.isOddNum ? <div className="z-padding-div"></div> : null}
    </div>
  );
}

export default RecruitmentBlock;
