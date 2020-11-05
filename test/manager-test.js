import chai from 'chai';
const expect = chai.expect;
import users from './test-data/users-data';
import rooms from './test-data/rooms-data';
import bookings from './test-data/bookings-data';
import User from '../src/User';
import hotel from '../src/hotel';
import Manager from '../src/Manager';

describe('Manager Class Extension', function() {

  let currentUser

  beforeEach(function () {
    currentUser = new User(10, users);
    hotel.roomInfo = rooms;
    hotel.bookingInfo = bookings;
  });

  it('should be an extension of the User class', function() {
    expect
  })
})