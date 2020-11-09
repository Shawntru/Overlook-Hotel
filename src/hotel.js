let hotel = {
  roomInfo: [],
  bookingInfo: [],
  userList: [],

  findRoomBooked(date, roomNum) {
    return (this.bookingInfo.find(booking => booking.date === date
      && booking.roomNumber === roomNum));
  },

  getRoomAvailabilities(date) {
    return this.roomInfo
      .filter(room => !!(!this.findRoomBooked(date, room.number)))
  },

  filterRoomsByType(rooms, type) {
    return rooms.filter(room => room.roomType === type);
  }

} 

export default hotel;