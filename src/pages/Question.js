import { Routes, Route } from 'react-router-dom';
import ReadQuestion from '../components/question/ReadQuestion';
import DepartmentQuestion from '../components/question/DepartmentQuestion';

function Question() {
  return (
    <Routes>
      <Route path={'/:party_id'} element={<ReadQuestion />} />
      <Route path={'/department/:party_id'} element={<DepartmentQuestion />} />
    </Routes>
  );
}

export default Question;
