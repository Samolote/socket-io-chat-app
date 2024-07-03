import { useState, useEffect } from 'react';
import { Message, type MessageType } from '../components/Message';

import socket from '../utilities/socket';
import { SocketIoEvents } from '../utilities/events';

export const MessagesList = () => {
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
