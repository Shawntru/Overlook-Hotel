import User from './User'

class Manager extends User {
  constructor(userId, userList) {
    super(userId, userList);
    this.userList = userList.map(user => new User(user.id, userList));
  }

}

export default Manager;