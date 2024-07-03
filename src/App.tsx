import { FormEvent, useEffect, useState } from 'react';

import { MessagesList } from './components/MessagesList';

import type { MessageType } from './components/Message';

import socket from './utilities/socket';
import { SocketIoEvents } from './utilities/events';

import './App.scss';
import { Modal } from './components/Modal';

/**
 * @todos
 * 1. Implement list of active users
 * 2. Implement chatrooms
 * 3. MAKE THE CODE CLEEEEEEEEAN bcs rn it fugly
 */

const App = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isUsernameSelected, setIsUsernameSelected] = useState(false);
  const { id: localId } = socket;

  useEffect(() => {
    socket.on(SocketIoEvents.CONNECT_ERROR, (error) => {
      if (error.message === 'invalid username') {
        setIsUsernameSelected(false);
      }
    });
    return () => {
      socket.off(SocketIoEvents.CONNECT_ERROR);
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
    if (message.trim() && typeof localId === 'string') {
      socket.emit(SocketIoEvents.SEND_MESSAGE, {
        message,
        socketId: localId,
        messageId: `${localId}${Math.random()}`,
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
      {!isUsernameSelected ? <Modal setIsUsernameSelected={setIsUsernameSelected} /> : null}
    </main>
  );
};

export default App;
