import { useCallback, useEffect, useState, MouseEvent, ChangeEvent, FormEvent } from 'react';

const MODAL_ANIMATION_DURATION = 400;
const MODAL_CLASSES = {
  open: 'modal-is-open',
  closing: 'modal-is-closing',
};

export const Modal = () => {
  const htmlTag = document.querySelector('html');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userName, setUserName] = useState('');

  const handleClose = useCallback(() => {
    if (htmlTag) {
      htmlTag.classList.add(MODAL_CLASSES.closing);
      setTimeout(() => {
        setIsModalOpen(false);
        htmlTag.classList.remove(...Object.values(MODAL_CLASSES));
      }, MODAL_ANIMATION_DURATION);
    }
  }, [htmlTag]);

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose, isModalOpen],
  );

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    console.log(value);
    setUserName(value);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem('userName', userName);
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <dialog open={isModalOpen} onClick={(e) => handleOverlayClick(e)}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={handleClose} />
          <h3>Set your username!</h3>
        </header>
        <form onSubmit={handleOnSubmit}>
          <fieldset role="group">
            <input type="text" placeholder="Type something here..." onChange={handleOnChange} />
            <input type="submit" value={'Submit'} />
          </fieldset>
        </form>
      </article>
    </dialog>
  );
};
