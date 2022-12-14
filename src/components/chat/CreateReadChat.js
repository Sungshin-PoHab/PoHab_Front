import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import instance from '../../utils/axiosConfig';
import '../../assets/CreateChat.css';

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
          <div className={'chat-item'} key={json_body.chat + json_body.writerId}>
            <p className={'chat-writer'}>
              {json_body.name} {json_body.role}
            </p>
            <p className={'chat-context'}>{json_body.chat}</p>
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

  useEffect(() => {
    fetchChat();
  }, []);

  const fetchChat = async () => {
    const res = await instance.get(`/chat/${apply_id}`);
    setChatList(
      res.data.map((data) => {
        return [
          <div className={'chat-item'} key={data.chat + data.staff.user.id}>
            <p className={'chat-writer'}>
              {data.staff.user.name} {data.staff.role}
            </p>
            <p className={'chat-context'}>{data.chat}</p>
          </div>,
        ];
      })
    );
  };

  const handleChange = (event) => {
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    event.preventDefault();

    publish(chat);
  };

  return (
    <div className={'L-container'}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>?????? ??????</h3>
        <p className={'L-description-context'}>??????????????? ????????? ?????? ??? ????????????.</p>
      </div>
      <div className={'chat-list'}>{chatList}</div>
      <form class="L_form" onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input className={'L-input-text'} type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
        </div>
        <input className={'L-submit'} type={'submit'} value={'?????? ?????????'} />
      </form>
    </div>
  );
}

export default CreateReadChat;
