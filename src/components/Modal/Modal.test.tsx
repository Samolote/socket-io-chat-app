import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Modal from './Modal';
import { act } from 'react';

jest.mock('@/utilities/socket.ts', () => {
  return {
    ...jest.requireActual('@/utilities/socket.ts'),
    connect: jest.fn(),
  };
});

const setIsUsernameSelected = jest.fn();

describe('Modal', () => {
  const mockUsername = 'Timothy';

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('closes after typing and message submit', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Modal setIsUsernameSelected={setIsUsernameSelected} />);

    const input = screen.getByRole('textbox', { name: /^username input$/i });

    await user.type(input, mockUsername);
    expect(input).toHaveDisplayValue(mockUsername);

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /^submit$/i }));
      jest.runAllTimers();
    });

    expect(setIsUsernameSelected).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog', { hidden: true })).not.toBeVisible();
  });
});
