import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import users from './test-data/users-data';
import rooms from './test-data/rooms-data';
import bookings from './test-data/bookings-data';
import hotel from '../src/hotel';

describe('User Class', function() {

  let currentUser

  beforeEach(function() {
    currentUser = new User(10, users);
    hotel.roomInfo = rooms;
    hotel.bookingInfo = bookings;
  });

  it('should be able to take an id', function() {
    expect(currentUser.id).to.deep.equal(10);
  });

  it('should be able to find its username', function() {
    expect(currentUser.findUserName(users)).to.deep.equal('Tony Armstrong');
  });

  it('should be able add it\'s found username to a name property', function() {
    expect(currentUser.name).to.deep.equal('Tony Armstrong');
  });

  it('should be able to find its bookings', function() {
    let userBookings = currentUser.getListOfBookings(10);
    expect(userBookings[2]).to.deep.equal({
      id: '5fwrgu4i7k55hl6w0',
      userID: 10,
      date: '2020/01/12',
      roomNumber: 18,
      roomServiceCharges: [],
      costPerNight: 496.41
    });
    expect(userBookings[5]).to.deep.equal({
      id: '5fwrgu4i7k55hl73q',
      userID: 10,
      date: '2020/01/11',
      roomNumber: 4,
      roomServiceCharges: [],
      costPerNight: 429.44
    });
  });

  it('should be able add it\'s found bookings to a booking property', function() {
    expect(currentUser.bookings[2].id).to.deep.equal('5fwrgu4i7k55hl6w0');
    expect(currentUser.bookings[5].id).to.deep.equal('5fwrgu4i7k55hl73q');
  });

  it('should calculate the total user has spent on rooms', function() {
    let totalSpent = currentUser.calculateRoomSpending(10);
    expect(totalSpent).to.deep.equal(5368.26);
  });

  it('should add the amount spent on rooms as a property of user', function() {
    expect(currentUser.totalSpent).to.deep.equal(5368.26);
  })
})