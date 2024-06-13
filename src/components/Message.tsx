type Props = {
  type: 'incoming' | 'outgoing';
  text: string;
};

export const Message = ({ type, text }: Props) => {
  return (
    <li className={`messages-list__element messages-list__element--${type}`}>
      <article>{text}</article>
    </li>
  );
};
