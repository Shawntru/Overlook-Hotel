// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import dom from './dom'

import api from './fetch';
import hotel from './hotel';
import User from './User';
import Manager from './Manager';

let currentUser;

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', checkLoginInfo);

window.onload = fetchSiteData();

function fetchSiteData() {
  Promise.all([api.fetchData('rooms'), api.fetchData('bookings'), api.fetchData('users')])
    .then(value => {
      hotel.roomInfo = value[0];
      hotel.bookingInfo = value[1];
      hotel.userList = value[2];
    })
}

function checkLoginInfo() {
  let username = dom.getLoginCreds('username');
  let password = dom.getLoginCreds('password');
  if (username === 'manager' && password === 'overlook2020') {
    loginManager(hotel.userList);
    return;
  }
  const userId = parseInt(username.slice(8, username.length));
  if (isValidLogin(username, password, userId)) {
    loginUser(userId, hotel.userList);
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
}

function loginManager(userList) {
  currentUser = new Manager('Manager', userList)
  console.log(currentUser);
}
