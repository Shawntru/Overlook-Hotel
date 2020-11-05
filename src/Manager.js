import User from './User'

class Manager extends User {
  constructor(userId, userList) {
    super(userId, userList);
    this.userList = userList.map(user => new User(user.id, userList));
    this.viewingUser = 0;
  }

  findUserByName(userName) {
    let foundUser = this.userList.find(user => user.name === userName);
    this.viewingUser = foundUser;
    return foundUser;
  }

}

export default Manager;