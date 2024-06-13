import { FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SocketIoEvents } from './events';
import './App.scss';
import { Message } from './components/Message';

/**
 * @todos
 * 1. Implement a form or modal containing a form for setting up a username
 * 2. Implement list of active users
 * 3. Implement chatrooms
 * 4. MAKE THE CODE CLEEEEEEEEAN bcs rn it fugly
 */

const URL = 'http://localhost:4000';

const socket = io(URL, { autoConnect: false });

type MessagePayloadType = {
  payload: {
    message: string;
    socketId: string;
    messageId: string;
  };
};

type MessageType = { message: string; socketId: string; messageId: string };

const App = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id: localId } = socket;

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on(
      SocketIoEvents.BROADCAST_MESSAGE,
      ({ payload: { message, socketId, messageId } }: MessagePayloadType) => {
        setMessages([...messages, { message, socketId, messageId }]);
      },
    );
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit(SocketIoEvents.SEND_MESSAGE, {
        payload: { message, socketId: socket.id, messageId: `${socket.id}${Math.random()}` },
      });
    }

    /**
     * @todo
     * Figure out how to make messages be emitted with such syntax
     * so that the payload is typed both for app and server
     * emit<SendMessageEventType>(SocketIoEvents.SEND_MESSAGE, { payload: { message } });
     */

    setMessage('');
  };

  return (
    <main className="container">
      <header>
        <h2>socket.io chat app</h2>
      </header>
      <ul className="messages-list">
        {messages.map(({ message, socketId, messageId }) => (
          <Message
            key={messageId}
            text={message}
            type={socketId !== localId ? 'incoming' : 'outgoing'}
          />
        ))}
      </ul>
      <form onSubmit={(e) => handleSendMessage(e)}>
        <fieldset role="group">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>Send</button>
        </fieldset>
      </form>
    </main>
  );
};

export default App;
