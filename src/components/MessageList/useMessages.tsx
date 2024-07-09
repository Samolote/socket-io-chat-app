import { useState, useEffect } from 'react';
import { type MessageType } from '@/components';
import { socket, SocketIoEvents } from '@/utilities';

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    socket.on(SocketIoEvents.BROADCAST_MESSAGE, ({ message, socketId, messageId }) => {
      setMessages([...messages, { message, socketId, messageId }]);
    });
  }, [messages]);

  return messages;
};
