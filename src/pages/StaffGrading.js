import { Routes, Route } from 'react-router-dom';
import CreateGrading from '../components/staffGrading/CreateGrading';

function StaffGrading() {
  return (
    <Routes>
      <Route path={'/create/:apply_id'} element={<CreateGrading />} />
    </Routes>
  );
}

export default StaffGrading;
