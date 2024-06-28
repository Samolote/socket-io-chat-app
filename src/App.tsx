import { FormEvent, useEffect, useState } from 'react';

import { MessagesList } from './components/MessagesList';

import type { MessageType } from './components/Message';

import socket from './socket';
import { SocketIoEvents } from './events';

import './App.scss';

/**
 * @todos
 * 1. Implement a form or modal containing a form for setting up a username
 * 2. Implement list of active users
 * 3. Implement chatrooms
 * 4. MAKE THE CODE CLEEEEEEEEAN bcs rn it fugly
 */

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
    socket.on(SocketIoEvents.BROADCAST_MESSAGE, ({ message, socketId, messageId }) => {
      setMessages([...messages, { message, socketId, messageId }]);
    });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && typeof socket.id === 'string') {
      socket.emit(SocketIoEvents.SEND_MESSAGE, {
        message,
        socketId: socket.id,
        messageId: `${socket.id}${Math.random()}`,
      });
    }
    setMessage('');
  };

  return (
    <main className="container">
      <header>
        <h2>socket.io chat app</h2>
      </header>
      <MessagesList localId={typeof localId === 'string' ? localId : ''} messages={messages} />
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
