import chai from 'chai';
const expect = chai.expect;
import users from './test-data/users-data';
import rooms from './test-data/rooms-data';
import bookings from './test-data/bookings-data';
import User from '../src/User';
import hotel from '../src/hotel';
import Manager from '../src/Manager';

describe.only('Manager Class Extension', function() {

  let currentUser;

  beforeEach(function () {
    currentUser = new Manager('Manager', users);
    hotel.roomInfo = rooms;
    hotel.bookingInfo = bookings;
  });

  it('should be an instance of the Manager extension of User class', function() {
    expect(currentUser).to.be.an.instanceof(User);
    expect(currentUser).to.be.an.instanceof(Manager);
  });

  it('should compile and store a list of all current user to access', function() {
    expect(currentUser.userList[2].name).to.deep.equal('Kelvin Schiller');
    expect(currentUser.userList[15].name).to.deep.equal('Garry Mills');
  })

  it('should be able to find users by name', function() {
    let foundUser = currentUser.findUserByName('Leatha Ullrich');
    expect(foundUser.id).to.deep.equal(1);
  });

})