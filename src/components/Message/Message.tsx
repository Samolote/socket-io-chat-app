export type MessageType = { message: string; socketId: string; messageId: string };

type PropsType = {
  type: 'incoming' | 'outgoing';
  text: string;
};

const Message = ({ type, text }: PropsType) => {
  return (
    <li className={`message-list__element message-list__element--${type}`}>
      <article>{text}</article>
    </li>
  );
};

export default Message;
