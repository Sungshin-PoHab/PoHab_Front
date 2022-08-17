import { Route, Routes } from 'react-router-dom';
import Hello from '../components/Hello';
import PartyEnrollPage from '../pages/PartyEnroll';
import CodePage from '../pages/PartyCode';
import Auth from '../pages/Auth';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Mypage from '../pages/Mypage';
import ClickButton from '../pages/ClickButton';
import Oauth from '../components/OAuth';
import Question from '../pages/Question';
import Recruit from '../pages/Recruit';
import Staff from '../pages/Staff';
import ApplyStatusForStaff from '../pages/ApplyStatusForStaff';
import GradingStandard from '../pages/GradingStandard';
import Chat from '../pages/Chat';
import StaffGrading from '../pages/StaffGrading';
import Questions from '../pages/Questions';
import GradingStatusForStaff from '../pages/GradingStatusForStaff.js';
import PartyListForStaff from '../pages/PartyListForStaff.js';
import MyApply from '../pages/MyApply';
import MainAuth from '../pages/MainAuth';

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/ClickButton/:party" element={<ClickButton />} />
        <Route path={'/recruit/*'} element={<Recruit />} />
        <Route path="/party/enroll" element={<PartyEnrollPage />} />
        <Route path="/party/enroll" element={Auth(PartyEnrollPage, true)} />
        <Route path="/party/staff" element={Auth(PartyListForStaff, true)} />
        <Route path="/party/:code" element={<CodePage />} />
        <Route path="/apply/forStaff/:department/:step" element={<ApplyStatusForStaff />} />
        <Route path="/grading/announcePNP/:department/:step" element={<GradingStatusForStaff />} />
        <Route path="/hello" element={Auth(Hello, true)} />
        <Route path="/login" element={Auth(Login, null)} />
        <Route path="/oauth" element={Auth(Oauth, null)} />
        <Route path="/question/*" element={<Question />} />
        <Route path={'/grading/standard/*'} element={<GradingStandard />} />
        <Route path={'/ws/*'} element={<Chat />} />
        <Route path={'/grading/*'} element={<StaffGrading />} />
        <Route path="/apply/:department/:step" element={Auth(Questions, true)} />
        <Route path="/user/myApply" element={<MyApply />} />
        <Route path={'/staff/*'} element={<Staff />} />
      </Routes>
    </div>
  );
}

export default Routers;
