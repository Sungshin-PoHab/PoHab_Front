import {Routes, Route} from "react-router-dom";
import RecruitStep from "../components/recruit/RecruitStep";

function Recruit () {
    return (
        <Routes>
            <Route path={'/step'} element={<RecruitStep />} />
        </Routes>
    )
}

export default Recruit;