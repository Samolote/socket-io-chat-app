export type MessageType = { message: string; socketId: string; messageId: string };

type PropsType = {
  type: 'incoming' | 'outgoing';
  text: string;
};

export const Message = ({ type, text }: PropsType) => {
  return (
    <li className={`messages-list__element messages-list__element--${type}`}>
      <article>{text}</article>
    </li>
  );
};
