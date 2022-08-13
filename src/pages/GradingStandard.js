import { Routes, Route } from 'react-router-dom';
import CreateStandard from '../components/gradingStandard/CreateStandard';

function GradingStandard() {
  return (
    <Routes>
      <Route path={'/create/:party_id/:step_id'} element={<CreateStandard />} />
    </Routes>
  );
}

export default GradingStandard;
