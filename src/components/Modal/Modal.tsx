import { useCallback, useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';

import { socket } from '@/utilities';

const MODAL_ANIMATION_DURATION = 400;
const MODAL_CLASSES = {
  open: 'modal-is-open',
  closing: 'modal-is-closing',
};

type PropsType = {
  setIsUsernameSelected: Dispatch<SetStateAction<boolean>>;
};

const Modal = ({ setIsUsernameSelected }: PropsType) => {
  const htmlTag = document.querySelector('html');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [username, setUsername] = useState('');

  const handleClose = useCallback(() => {
    if (htmlTag) {
      htmlTag.classList.add(MODAL_CLASSES.closing);
      setTimeout(() => {
        setIsModalOpen(false);
        htmlTag.classList.remove(...Object.values(MODAL_CLASSES));
      }, MODAL_ANIMATION_DURATION);
    }
  }, [htmlTag]);

  const handleOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUsername(value);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSelected(true);
      socket.auth = { username };
      socket.connect();
      handleClose();
    }
  };

  return (
    <dialog open={isModalOpen}>
      <article>
        <header>
          <h3>Set your username!</h3>
        </header>
        <form onSubmit={handleOnSubmit}>
          <fieldset role="group">
            <input
              type="text"
              aria-label="Username input"
              placeholder="Type something here..."
              onChange={handleOnChange}
            />
            <input type="submit" value={'Submit'} />
          </fieldset>
        </form>
      </article>
    </dialog>
  );
};

export default Modal;
