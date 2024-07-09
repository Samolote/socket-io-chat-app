import { Message } from '@/components';
import { useMessages } from './useMessages';
import { socket } from '@/utilities';

const MessagesList = () => {
  const { id } = socket;
  const messages = useMessages();

  return (
    <ul className="messages-list">
      {messages.map(({ message, socketId, messageId }) => (
        <Message key={messageId} text={message} type={socketId !== id ? 'incoming' : 'outgoing'} />
      ))}
    </ul>
  );
};

export default MessagesList;
