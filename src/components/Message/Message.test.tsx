import { render, screen } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  const mockText = 'props.text';
  it('renders component with proper class depending on the type prop', () => {
    const { rerender } = render(<Message text={mockText} type="incoming" />);
    expect(screen.getByRole('listitem').classList).toContain('message-list__element--incoming');

    rerender(<Message text={mockText} type="outgoing" />);
    expect(screen.getByRole('listitem').classList).toContain('message-list__element--outgoing');
  });
});
