class User {
  constructor (userId, userList) {
    this.id = userId;
    this.name = this.findUserName(userList);
  }

  findUserName(userList) {
    return userList.find(user => this.id === user.id).name;
  }

}

export default User;