import { Routes, Route } from 'react-router-dom';
import CreateStandard from '../components/gradingStandard/CreateStandard';
import ReadStandard from '../components/gradingStandard/ReadStandard';

function GradingStandard() {
  return (
    <Routes>
      <Route path={'/create/:party_id/:step_id'} element={<CreateStandard />} />
      <Route path={'/read/:party_id/:step_id'} element={<ReadStandard />} />
    </Routes>
  );
}

export default GradingStandard;
