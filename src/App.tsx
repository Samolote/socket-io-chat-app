import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.scss';

const URL = 'http://localhost:4000';

const socket = io(URL, { autoConnect: false });

const App = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="container">
      <header>
        <h2>websockets chat app</h2>
      </header>
      <ul className="messages-list">
        <li className="messages-list__element messages-list__element--incoming">
          <article>Incomming</article>
        </li>
        <li className="messages-list__element messages-list__element--outgoing">
          <article>Outgoing</article>
        </li>
      </ul>
      <form>
        <fieldset role="group">
          <input type="text" />
          <button>Send</button>
        </fieldset>
      </form>
    </main>
  );
};

export default App;
