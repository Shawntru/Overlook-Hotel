const hotel = {
  roomInfo: [],
  bookingInfo: [],
  userList: [],

  findRoomBooked(date, roomNum) {
    return (this.bookingInfo.find((booking) => booking.date === date
      && booking.roomNumber === roomNum));
  },

  getRoomAvailabilities(date) {
    return this.roomInfo
      .filter((room) => !this.findRoomBooked(date, room.number));
  },

  filterRoomsByType(rooms, type) {
    return rooms.filter((room) => room.roomType === type);
  },

  getDailyRevenue(date) {
    const revenue = this.roomInfo
      .filter((room) => !!(this.findRoomBooked(date, room.number)))
      .reduce((dailyRevenue, room) => dailyRevenue += room.costPerNight, 0);
    return (Math.round(revenue * 100) / 100);
  },
};

export default hotel;
