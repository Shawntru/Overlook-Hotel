import { hotel } from "./hotel";

class User {
  constructor (userId, userList) {
    this.id = userId;
    this.name = this.findUserName(userList);
    this.totalSpent = this.calculateRoomSpending();
    console.log(this);
  }

  findUserName(userList) {
    return userList.find(user => this.id === user.id).name;
  }

  calculateRoomSpending() {
    let spending = hotel.bookingInfo
      .filter(booking => booking.userID === this.id)
      .map(booking => booking.costPerNight = hotel.roomInfo
        .find(room => room.number === booking.roomNumber))
      .reduce((sum, room) => {
        return sum += room.costPerNight;
      }, 0)
    return (Math.round(spending * 100) / 100);
  }
}

export default User;