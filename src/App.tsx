import { useState, useEffect } from 'react';

import { MessagesList } from './components/MessagesList';
import { MessageForm } from './components/MessageForm';
import { Modal } from './components/Modal';

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
  const [isUsernameSelected, setIsUsernameSelected] = useState(false);

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

  return (
    <main className="container">
      <header>
        <h2>socket.io chat app</h2>
      </header>
      <MessagesList />
      <MessageForm />
      {!isUsernameSelected ? <Modal setIsUsernameSelected={setIsUsernameSelected} /> : null}
    </main>
  );
};

export default App;
