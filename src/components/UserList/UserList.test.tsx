import { render, screen } from '@testing-library/react';
import UserList from './UserList';

describe('UserList', () => {
  it('renders', () => {
    render(<UserList />);
    expect(screen.getByRole('list')).toBeVisible();
  });
});
