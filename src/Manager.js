import User from './User';
import hotel from './hotel';

class Manager extends User {
  constructor(userId) {
    super(userId);
    this.userList = hotel.userList.map((user) => ({ id: user.id, name: user.name }));
  }

  findUserByName(userName) {
    return this.userList.find((user) => user.name === userName);
  }
}

export default Manager;
