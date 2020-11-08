import hotel from "./hotel";
import api from "./fetch";

class User {
  constructor (userId) {
    this.id = userId;
    this.name = this.findUserName(hotel.userList);
    this.bookings = this.getListOfBookings(this.id);
    this.totalSpent = this.calculateRoomSpending(this.id);
    this.loyaltyLevel = this.calculateLoyaltyLevel(this.totalSpent);
  }

  findUserName(userList) {
    if (this.id === 'Manager') return 'Manager';
    return userList.find(user => this.id === user.id).name;
  }
  
  getListOfBookings(userId) {
    let bookings = hotel.bookingInfo
      .filter(booking => booking.userID === userId);
    return bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  calculateRoomSpending(userId) {
    let spending = this.getListOfBookings(userId)
    .map(booking => booking.costPerNight = hotel.roomInfo
      .find(room => room.number === booking.roomNumber).costPerNight)
      .reduce((sum, cost) => {return sum += cost}, 0)
      return (Math.round(spending * 100) / 100);
  }

  calculateLoyaltyLevel(amountSpent) {
    let loyaltyLevel = 'Bronze Initiate';
    if (amountSpent > 5000) loyaltyLevel = 'Silver Plus';
    if (amountSpent > 7000) loyaltyLevel = 'Gold Partner';
    if (amountSpent > 9000) loyaltyLevel = 'Platinum Elite';
    return loyaltyLevel;
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