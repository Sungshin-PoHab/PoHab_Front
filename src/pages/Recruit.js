import { Routes, Route } from 'react-router-dom';
import RecruitStep from '../components/recruit/RecruitStep';
import RecruitDepartment from '../components/recruit/RecruitDepartment';
import ReadRecruit from '../components/recruit/ReadRecruit';

function Recruit() {
  return (
    <Routes>
      <Route path={'/read/:party_id'} element={<ReadRecruit />} />
      <Route path={'/step/:party_id'} element={<RecruitStep />} />
      <Route path={'/department/:party_id'} element={<RecruitDepartment />} />
    </Routes>
  );
}

export default Recruit;
