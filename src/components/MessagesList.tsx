import { Message, type MessageType } from '../components/Message';

type PropsType = {
  messages: MessageType[];
  localId: string;
};

export const MessagesList = ({ messages, localId }: PropsType) => {
  return (
    <ul className="messages-list">
      {messages.map(({ message, socketId, messageId }) => (
        <Message
          key={messageId}
          text={message}
          type={socketId !== localId ? 'incoming' : 'outgoing'}
        />
      ))}
    </ul>
  );
};
