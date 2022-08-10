import { Routes, Route } from 'react-router-dom';
import ReadQuestion from '../components/question/ReadQuestion';

function Question() {
  return (
    <Routes>
      <Route path={'/:party_id'} element={<ReadQuestion />} />
    </Routes>
  );
}

export default Question;
