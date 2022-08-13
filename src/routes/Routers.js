import { Route, Routes } from 'react-router-dom';
import Hello from '../components/Hello';
import PartyEnrollPage from '../pages/PartyEnroll';
import CodePage from '../pages/PartyCode';
import Auth from '../pages/Auth';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Oauth from '../components/OAuth';
import ApplyStatusForStaff from '../pages/ApplyStatusForStaff';
import Chat from "../pages/Chat";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/main" element={<Main />} />
        <Route path="/party/enroll" element={Auth(PartyEnrollPage, true)} />
        <Route path="/party/:code" element={<CodePage />} />
        <Route path="/apply/forStaff/:department/:step" element={<ApplyStatusForStaff />} />
        <Route path="/hello" element={Auth(Hello, true)} />
        <Route path="/login" element={Auth(Login, null)} />
        <Route path="/oauth" element={Auth(Oauth, null)} />
        <Route path={"/ws/*"} element={<Chat />} />
      </Routes>
    </div>
  );
}

export default Routers;
