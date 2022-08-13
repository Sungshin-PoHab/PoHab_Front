import { Routes, Route } from 'react-router-dom';
import CreateStaff from '../components/staff/CreateStaff';
import ReadStaff from '../components/staff/ReadStaff';

function Staff() {
  return (
    <Routes>
      <Route path={'/create/:party_id'} element={<CreateStaff />} />
      <Route path={'/read/:party_id'} element={<ReadStaff />} />
    </Routes>
  );
}

export default Staff;
