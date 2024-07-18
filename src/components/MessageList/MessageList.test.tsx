import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';
import { type MessageType } from '../MessageList';
import { useMessages } from './useMessages';

jest.mock('./useMessages', (): { useMessages: () => MessageType[] } => ({
  useMessages: () => [
    { message: 'Hello', messageId: '1', socketId: '1' },
    { message: 'Hi', messageId: '2', socketId: '2' },
    { message: 'How are you?', messageId: '3', socketId: '1' },
    { message: 'Good. wbu?', messageId: '4', socketId: '2' },
    { message: 'Same', messageId: '5', socketId: '1' },
    { message: 'Yo what is this NPC conversation?', messageId: '6', socketId: '3' },
  ],
}));

jest.mock('@/utilities/socket.ts', () => {
  return {
    ...jest.requireActual('@/utilities/socket.ts'),
    id: '3',
  };
});

describe('MessageList', () => {
  it('renders all messages', () => {
    render(<MessageList />);
    expect(screen.getAllByRole('listitem')).toHaveLength(useMessages().length);
  });
});
