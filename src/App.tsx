import './App.scss';

const App = () => {
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
