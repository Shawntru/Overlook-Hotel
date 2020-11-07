import './css/base.scss';

import dom from './dom'
import api from './fetch';
import hotel from './hotel';
import User from './User';
import Manager from './Manager';

let currentUser;

const loginButton = document.getElementById('login-button');
const userInfoDisplay = document.querySelector('.user-display-name');
const headerDisplay = document.querySelector('.header');

loginButton.addEventListener('click', checkLoginInfo);

window.onload = fetchSiteData();

function fetchSiteData() {
  Promise.all([api.fetchData('rooms'), api.fetchData('bookings'), api.fetchData('users')])
    .then(value => {
      hotel.roomInfo = value[0];
      hotel.bookingInfo = value[1];
      hotel.userList = value[2];

      // SKIPPING LOGIN 
      loginUser(20);
      // SKIPPING LOGIN 

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

function loginUser(userId) {
  currentUser = new User(userId);
  console.log(currentUser);
  dom.switchView('.user-page');
  dom.loadUserInfo(currentUser, userInfoDisplay);

  // TODO: Create dom function to handle all login animations
  dom.retractHeader(headerDisplay);
}



// function loginManager() {
//   currentUser = new Manager('Manager')
//   console.log(currentUser);
// }


