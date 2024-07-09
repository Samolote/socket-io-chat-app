import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import MessageForm from './MessageForm';
import { socket } from '@/utilities';

jest.mock('@/utilities/socket.ts', () => {
  return {
    ...jest.requireActual('@/utilities/socket.ts'),
    emit: jest.fn(),
    id: 'mockSocketId',
  };
});

describe('MessageForm', () => {
  const mockMessage = 'Hello';
  it('handles typing and message submit', async () => {
    const user = userEvent.setup();
    render(<MessageForm />);

    const input = screen.getByRole('textbox', { name: 'Chat input' });

    await user.type(input, mockMessage);
    expect(input).toHaveDisplayValue(mockMessage);

    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(socket.emit).toHaveBeenCalledTimes(1);
    expect(input).toHaveDisplayValue('');
  });
});
