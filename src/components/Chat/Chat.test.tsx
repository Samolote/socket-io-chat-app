import { render, screen } from '@testing-library/react';
import Chat from './Chat';

describe('Chat', () => {
  it('renders messages and form', () => {
    render(<Chat messageList={'messages'} messagesForm={'form'} />);
    expect(screen.getByText(/messages/i)).toBeVisible();
    expect(screen.getByText(/form/i)).toBeVisible();
  });
});
