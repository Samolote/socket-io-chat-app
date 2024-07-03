import { useState, useEffect } from 'react';

import { MessagesList } from './components/MessagesList';
import { MessageForm } from './components/MessageForm';
import { Modal } from './components/Modal';

import type { MessageType } from './components/Message';

import { SocketIoEvents } from './utilities/events';
import socket from './utilities/socket';

import './App.scss';

/**
 * @todos
 * 1. Implement list of active users
 * 2. Implement chatrooms
 * 3. MAKE THE CODE CLEEEEEEEEAN bcs rn it fugly
 */

const App = () => {
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

  return (
    <main className="container">
      <header>
        <h2>socket.io chat app</h2>
      </header>
      <MessagesList localId={typeof localId === 'string' ? localId : ''} messages={messages} />
      <MessageForm />
      {!isUsernameSelected ? <Modal setIsUsernameSelected={setIsUsernameSelected} /> : null}
    </main>
  );
};

export default App;
