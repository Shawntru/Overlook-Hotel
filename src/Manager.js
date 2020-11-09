import User from './User';
import hotel from './hotel';

class Manager extends User {
  constructor(userId) {
    super(userId);
    this.userList = hotel.userList.map(user => new User(user.id));
    this.viewingUser = 0;
  }

  findUserByName(userName) {
    let foundUser = this.userList.find(user => user.name === userName);
    this.viewingUser = foundUser;
    return foundUser;
  }

}

export default Manager;