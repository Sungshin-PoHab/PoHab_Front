import { Route, Routes } from 'react-router-dom';
import Hello from '../components/Hello';
import PartyEnrollPage from '../pages/PartyEnroll';
import CodePage from '../pages/PartyCode';
import Auth from '../pages/Auth';
import Login from '../pages/Login';
import Oauth from '../components/OAuth';
import Recruit from '../pages/Recruit';

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path={'/recruit/*'} element={<Recruit />} />
        <Route path="/party/enroll" element={<PartyEnrollPage />} />
        <Route path="/party/:code" element={<CodePage />} />
        <Route path="/hello" element={Auth(Hello, true)} />
        <Route path="/login" element={Auth(Login, null)} />
        <Route path="/oauth" element={Auth(Oauth, null)} />
      </Routes>
    </div>
  );
}

export default Routers;
