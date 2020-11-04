import { fetchData } from './fetch';

let hotel = {

  async getHotelData() {
    this.roomInfo = await fetchData('rooms');
    this.bookingInfo = await fetchData('bookings');
    console.log(hotel);
  },

  isRoomBooked(date, roomNum) {
    return (this.bookingInfo.find(booking => booking.date === date
      && booking.roomNumber === roomNum));
  }

} 

export { hotel };