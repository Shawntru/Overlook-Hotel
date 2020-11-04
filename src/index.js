// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { fetchData } from './fetch.js';
import { hotel } from './hotel';

window.onload = initializeSite();

async function initializeSite() {
  await hotel.getHotelData();
  let userList = await fetchData('users');
  getLoginInfo();
}

function getLoginInfo() {
  // Query DOM elements for user input, check password
  // Will use temp username and pass set below:
  const username = 'customer10';
  const password = 'overlook2020';
  const userId = parseInt(username.slice(8,10));
  if (1 > userId > 50) alert('Need valid username');
  loginUser(userId);
}

function loginUser(userId) {
  console.log('Logged in as user' + userId);
}
