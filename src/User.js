import hotel from "./hotel";
import api from "./fetch";

class User {
  constructor (userId, userList) {
    this.id = userId;
    this.name = this.findUserName(userList);
    this.bookings = this.getListOfBookings(this.id);
    this.totalSpent = this.calculateRoomSpending(this.id);
  }

  findUserName(userList) {
    if (this.id === 'Manager') return 'Manager';
    return userList.find(user => this.id === user.id).name;
  }
  
  getListOfBookings(userId) {
    return hotel.bookingInfo
    .filter(booking => booking.userID === userId);
  }
  
  calculateRoomSpending(userId) {
    let spending = this.getListOfBookings(userId)
    .map(booking => booking.costPerNight = hotel.roomInfo
      .find(room => room.number === booking.roomNumber).costPerNight)
      .reduce((sum, cost) => {return sum += cost}, 0)
      return (Math.round(spending * 100) / 100);
  }

  makeReservation(userId, inputDate, roomNum) {
    Promise.all([api.createReservation(userId, inputDate, roomNum)])
      .then(value => {
        return value[0];
      })
  }

  removeReservation(reservationId) {
    Promise.all([api.deleteReservation(reservationId)])
      .then(value => {
        return value[0];
      })
  }
}

export default User;