import { Routes, Route, useParams } from 'react-router-dom';
import CreateQuestion from '../components/question/CreateQuestion';
import DepartmentQuestion from '../components/question/DepartmentQuestion';
import ReadQuestion from '../components/question/ReadQuestion';

function Question() {
  return (
    <Routes>
      <Route path={'/:party_id'} element={<ReadQuestion />} />
      <Route path={'/create/:party_id'} element={<CreateQuestion />} />
      <Route
        path={'/create/department/:party_id'}
        element={<DepartmentQuestion />}
      />
    </Routes>
  );
}

export default Question;
