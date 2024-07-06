export type User = {
  userID: string;
  username: string;
};

export class Users {
  list: User[];

  constructor() {
    this.list = [];
  }

  addUser(user: User) {
    this.list.push(user);
    return user;
  }

  getUser(id: string) {
    return this.list.find(({ userID }) => userID === id);
  }

  removeUser(id: string) {
    const userID = this.list.findIndex(({ userID }) => userID === id);
    if (userID === -1) return;

    const [removedUser] = this.list.splice(userID, 1);
    return removedUser;
  }

  getUsernames() {
    const usernames = this.list.map(({ username }) => username);
    return usernames;
  }
}
