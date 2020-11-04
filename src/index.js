// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { fetchData } from './fetch.js';
import { hotel } from './hotel';
import User from './User';

let currentUser;

window.onload = initializeSite();

async function initializeSite() {
  await hotel.getHotelData();
  // console.log(hotel.getRoomAvailabilities("2020/01/24"));
  getLoginInfo();
}

function getLoginInfo() {
  // Query DOM elements for user input, check password
  // Will use temp username and pass set below:
  const username = 'customer19';
  const password = 'overlook2020';
  //----------------------//
  const userId = parseInt(username.slice(8, username.length));
  if (1 > userId || userId > 50) {
    alert(`Username '${username}' is not valid.`);
    return;
  }
  loginUser(userId);
}

async function loginUser(userId) {
  let userList = await fetchData('users');
  currentUser = new User(userId, userList);
}
