import { fetchData } from './fetch';

let hotel = {

  async getHotelData() {
    this.roomInfo = await fetchData('rooms');
    this.bookingInfo = await fetchData('bookings');
  },

  findRoomBooked(date, roomNum) {
    return (this.bookingInfo.find(booking => booking.date === date
      && booking.roomNumber === roomNum));
  },

  roomsAvailableOnDate(date) {
    return this.roomInfo.filter(room => !this.findRoomBooked(date, room.number));
  },

} 

export { hotel };