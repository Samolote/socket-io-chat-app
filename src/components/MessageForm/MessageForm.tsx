import { useState, ChangeEvent, FormEvent } from 'react';
import { socket, SocketIoEvents } from '@/utilities';

const MessageForm = () => {
  const { id } = socket;

  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && typeof id === 'string') {
      socket.emit(SocketIoEvents.SEND_MESSAGE, {
        message,
        socketId: id,
        messageId: `${id}${Math.random()}`,
      });
    }
    setMessage('');
  };

  const handleTextInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setMessage(value);
  };

  return (
    <form onSubmit={handleSendMessage}>
      <fieldset role="group">
        <input type="text" value={message} onChange={handleTextInput} />
        <button>Send</button>
      </fieldset>
    </form>
  );
};

export default MessageForm;
