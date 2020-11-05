// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import api from './fetch.js';
import hotel from './hotel';
import User from './User';
import Manager from './Manager';

let currentUser;

window.onload = fetchSiteData();

function fetchSiteData() {
  Promise.all([api.fetchData('rooms'), api.fetchData('bookings'), api.fetchData('users')])
    .then(value => {
      hotel.roomInfo = value[0];
      hotel.bookingInfo = value[1];
      getLoginInfo(value[2]);
    })
}

function getLoginInfo(userList) {
  // Query DOM elements for user input, check password
  // Will use temp username and pass set below:
  const username = 'customer49';
  const password = 'overlook2020';
  //----------------------//

  if (username === 'manager' && password === 'overlook2020') {
    loginManager(userList);
    return;
  }
  const userId = parseInt(username.slice(8, username.length));
  if (isValidLogin(username, password, userId)) {
    loginUser(userId, userList);
  } else {
    alert('Login not valid');
    return;
  }
}

function isValidLogin(username, password, userId) {
  return !(
    username.slice(0, 8) != 'customer'
    || 1 > userId
    || 50 < userId
    || password !== 'overlook2020')
}

function loginUser(userId, userList) {
  currentUser = new User(userId, userList);
  console.log(currentUser);
  // console.log(currentUser.makeReservation(currentUser.id, '2020/05/05', 5));
  console.log(currentUser.removeReservation(1604617713051));
}

function loginManager(userList) {
  currentUser = new Manager('Manager', userList)
  console.log(currentUser);
}
