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

  getRoomAvailabilities(date) {
    return this.roomInfo.map(room => {
      room.available = !!(!this.findRoomBooked(date, room.number));
      return room;
    })
  },

  filterRoomsByType(rooms, type) {
    return rooms.filter(room => room.roomType === type);
  }

} 

export { hotel };