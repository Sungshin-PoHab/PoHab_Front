import { Routes, Route } from 'react-router-dom';
import CreateReadChat from '../components/chat/CreateReadChat';

function Chat() {
  return (
    <Routes>
      <Route path={'/chat/:apply_id'} element={<CreateReadChat />} />
    </Routes>
  );
}

export default Chat;
