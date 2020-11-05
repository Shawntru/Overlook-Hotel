import { hotel } from "./hotel";

class User {
  constructor (userId, userList) {
    this.id = userId;
    this.name = this.findUserName(userList);
    this.bookings = this.getListOfBookings();
    this.totalSpent = this.calculateRoomSpending();
  }

  findUserName(userList) {
    if (this.id === 'Manager') return 'Manager';
    return userName =  userList.find(user => this.id === user.id).name;
  }

  getListOfBookings() {
    return hotel.bookingInfo
      .filter(booking => booking.userID === this.id);
  }

  calculateRoomSpending() {
    let spending = this.getListOfBookings()
      .map(booking => booking.costPerNight = hotel.roomInfo
        .find(room => room.number === booking.roomNumber))
      .reduce((sum, room) => {return sum += room.costPerNight}, 0)
    return (Math.round(spending * 100) / 100);
  }
}

export default User;