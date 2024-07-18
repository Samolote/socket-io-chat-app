import { useMessages } from './useMessages';
import { socket } from '@/utilities';
import './MessagesList.scss';

export type MessageType = { message: string; socketId: string; messageId: string };

const MessageList = () => {
  const { id } = socket;
  const messages = useMessages();

  return (
    <ul className="message-list">
      {messages.map(({ message, socketId }) => (
        <li
          className={`message-list__element message-list__element--${
            socketId !== id ? 'incoming' : 'outgoing'
          }`}
        >
          <article>{message}</article>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
