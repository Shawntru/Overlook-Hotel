import chai from 'chai';
const expect = chai.expect;
import rooms from './test-data/rooms-data';
import bookings from './test-data/bookings-data';
import hotel from '../src/hotel';

describe('hotel object', function() {
  
  beforeEach(function () {
    hotel.roomInfo = rooms;
    hotel.bookingInfo = bookings;
  });

  it('should store info about the rooms', function() {
    expect(hotel.roomInfo).to.deep.equal(rooms);
  });

  it('should store info about bookings', function() {
    expect(hotel.bookingInfo).to.deep.equal(bookings);
  });

  it('should be able to find booking info by date and room', function() {
    let bookingRoomInfo = hotel.findRoomBooked('2020/01/24', 24);
    expect(bookingRoomInfo.id).to.deep.equal('5fwrgu4i7k55hl6t5');
  });

  it('should be able to get all room availabilities by date', function() {
    let bookingRoomsInfo = hotel.getRoomAvailabilities('2020/01/24');
    expect(bookingRoomsInfo[2]).to.deep.equal({
      number: 3,
      roomType: 'single room',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 491.14,
      available: true
    });
    expect(bookingRoomsInfo[6]).to.deep.equal({
      number: 7,
      roomType: 'single room',
      bidet: false,
      bedSize: 'queen',
      numBeds: 2,
      costPerNight: 231.46,
      available: false
    });
  });

  it('should be able to filter rooms by type', function () {
    let filteredRooms = hotel.filterRoomsByType(hotel.roomInfo, 'single room');
    expect(filteredRooms[2].number).to.deep.equal(5);
    expect(filteredRooms[5].number).to.deep.equal(11);
  });

});
