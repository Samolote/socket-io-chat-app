import { useState, useEffect } from 'react';
import { Message, type MessageType } from '@/components';
import { socket, SocketIoEvents } from '@/utilities';

const MessagesList = () => {
  const { id } = socket;
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    socket.on(SocketIoEvents.BROADCAST_MESSAGE, ({ message, socketId, messageId }) => {
      setMessages([...messages, { message, socketId, messageId }]);
    });
  }, [messages]);

  return (
    <ul className="messages-list">
      {messages.map(({ message, socketId, messageId }) => (
        <Message key={messageId} text={message} type={socketId !== id ? 'incoming' : 'outgoing'} />
      ))}
    </ul>
  );
};

export default MessagesList;
