import { ReactNode } from 'react';
import './Chat.scss';

type PropsType = {
  messageList: ReactNode;
  messagesForm: ReactNode;
};

const Chat = ({ messageList, messagesForm }: PropsType) => {
  return (
    <div className="chat">
      <div className="chat__messages">{messageList}</div>
      <div className="chat__input">{messagesForm}</div>
    </div>
  );
};

export default Chat;
