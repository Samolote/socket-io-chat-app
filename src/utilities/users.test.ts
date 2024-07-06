import { type User, Users } from './users';

describe('Users', () => {
  let users: Users;

  const mockUsersData: User[] = [
    { userID: '1', username: 'josh' },
    { userID: '2', username: 'ben' },
    { userID: '3', username: 'ann' },
  ];

  beforeEach(() => {
    users = new Users();
    mockUsersData.forEach((user) => users.addUser(user));
  });

  it('adds new user to the list', () => {
    const newUser = users.addUser({ userID: '4', username: 'tom' });
    expect(users.list).toContain(newUser);
  });

  it('gets the right user from the list', () => {
    const mockUser = mockUsersData[1];
    const user = users.getUser('2');
    expect(mockUser).toEqual(user);
  });

  it("returns undefined if userID doesn't match any user from list", () => {
    const value = users.removeUser('55');
    expect(value).toBe(undefined);
  });

  it('removes the right user from the list', () => {
    const mockUser = mockUsersData[0];
    const user = users.removeUser('1');
    expect(mockUser).toEqual(user);
    expect(users.list).not.toContain(user);
  });

  it('gets list of usernames', () => {
    const mockUsernames = mockUsersData.map(({ username }) => username);
    const usernames = users.getUsernames();
    mockUsernames.forEach((username) => expect(usernames).toContain(username));
  });
});
