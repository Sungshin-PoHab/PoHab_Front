import {useState} from "react";

function RecruitStep() {
    const [stepBtn, setBtnStep] = useState([]);
    const [stepName, setStepName] = useState("1단계");

    const handlePlusBtn = () => {
        setBtnStep(stepBtn.concat(<button>{stepName}</button>));
    }

    const handleStepNameChange = (event) => {
        const value = event.target.value;
        setStepName(value);
    }

    return (
        <div>
            <div>
                <h3>모집 일정 등록</h3>
                <p>모집 단계와 모집 시작 및 모집 마감 일정을 등록할 수 있습니다.</p>
                <p>모집 단계 이름은 수정이 불가하니 주의해주세요.</p>
            </div>
            <div>
                <p>모집 단계</p>
                <input type={"text"} name={"step_name"} onChange={handleStepNameChange} value={stepName}/>
                {stepBtn}
                <button onClick={handlePlusBtn}>+</button>
            </div>
            <div>
                <p>모집 시작 일정</p>
                <input type={"datetime-local"} name={"start_date"} />
            </div>
            <div>
                <p>모집 종료 일정</p>
                <input type={"datetime-local"} name={"end_date"}/>
            </div>
            <input type={"submit"} name={"step_submit"} value={"모집 부서 이어서 등록 >"}/>
        </div>
    )
}

export default RecruitStep;