import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';

function CreateReadChat() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState('');

  const { apply_id } = useParams();
  const client = useRef({});

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8787/ws',
      onConnect: () => {
        console.log('success');
        subscribe();
      },
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
      connectHeaders: {
        Authorization: window.localStorage.getItem('authorization'),
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    console.log('/pub/chat/');
    if (!client.current.connected) return;

    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        applyId: apply_id,
        chat: chat,
      }),
    });

    setChat('');
  };

  const subscribe = () => {
    console.log('/sub/chat/' + apply_id);
    client.current.subscribe('/sub/chat/' + apply_id, (body) => {
      console.log(JSON.parse(body.body));
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list) => [
        ..._chat_list,
        [
          <div key={json_body.chat + json_body.writerId}>
            <p>작성자 {json_body.writerId}</p>
            <p>{json_body.chat}</p>
          </div>,
        ],
      ]);
    });

    console.log(chatList);
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const handleChange = (event) => {
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    event.preventDefault();

    publish(chat);
  };

  return (
    <div>
      <div>{chatList}</div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <input
          type={'text'}
          name={'chatInput'}
          onChange={handleChange}
          value={chat}
        />
        <input type={'submit'} value={'의견 보내기'} />
      </form>
    </div>
  );
}

export default CreateReadChat;
