import { Routes, Route } from 'react-router-dom';
import CreateGrading from '../components/staffGrading/CreateGrading';
import ReadGrading from '../components/staffGrading/ReadGrading';

function StaffGrading() {
  return (
    <Routes>
      <Route path={'/create/:apply_id'} element={<CreateGrading />} />
      <Route path={'/read/:grading_status_id'} element={<ReadGrading />} />
    </Routes>
  );
}

export default StaffGrading;
