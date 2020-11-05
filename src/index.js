// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import fetchData from './fetch.js';
import hotel from './hotel';
import User from './User';
import Manager from './Manager';

let currentUser;

window.onload = fetchSiteData();

function fetchSiteData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('users')])
    .then(value => {
      hotel.roomInfo = value[0];
      hotel.bookingInfo = value[1];
      getLoginInfo(value[2]);
    })
}

function getLoginInfo(userList) {
  // Query DOM elements for user input, check password
  // Will use temp username and pass set below:
  const username = 'customer20';
  const password = 'overlook2020';
  //----------------------//

  if (username === 'manager' && password === 'overlook2020') {
    loginManager(userList);
    return;
  }
  const userId = parseInt(username.slice(8, username.length));
  if ((username.slice(0, 8) != 'customer') 
    || (1 > userId || userId > 50)
    || password !== 'overlook2020') {
    alert('Login not valid');
    return;
  } else {
    loginUser(userId, userList) 
  }
}

function loginUser(userId, userList) {
  currentUser = new User(userId, userList);
  console.log(currentUser);
}

function loginManager(userList) {
  currentUser = new Manager('Manager', userList)
  currentUser.findUserByName('Leatha Ullrich');
  console.log(currentUser);
}
