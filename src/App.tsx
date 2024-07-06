import { useState, useEffect } from 'react';
import { MessagesList, MessageForm, Modal } from '@/components';
import { socket, SocketIoEvents } from '@/utilities';

import './App.scss';

/**
 * @todos
 * 1. Implement list of active users
 * 2. Implement chatrooms
 * 3. MAKE THE CODE CLEEEEEEEEAN bcs rn it fugly
 * 4. Show user a visual cue if invalid username was given
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
