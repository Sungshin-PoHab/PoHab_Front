import {Routes, Route} from "react-router-dom";
import RecruitStep from "../components/recruit/RecruitStep";
import RecruitDepartment from "../components/recruit/RecruitDepartment";

function Recruit () {
  return (
    <Routes>
      <Route path={'/step'} element={<RecruitStep />} />
      <Route path={"/department/:party_id"} element={<RecruitDepartment />} />
    </Routes>
  )
}

export default Recruit;