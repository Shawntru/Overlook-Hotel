import './css/base.scss';
import './images/room-0.jpg';
import './images/room-1.jpg';
import './images/room-2.jpg';
import './images/room-3.jpg';
import './images/room-4.jpg';
import './images/room-5.jpg';
import './images/room-6.jpg';
import './images/room-7.jpg';
import './images/room-8.jpg';
import './images/room-9.jpg';
import './images/room-10.jpg';

import dom from './dom';
import api from './fetch';
import hotel from './hotel';
import User from './User';
import Manager from './Manager';

let currentUser;

const loginButton = document.getElementById('login-button');
const userNameDisplay = document.querySelector('.user-display-name');
const headerDisplay = document.querySelector('.header');
const checkAvailButton = document.getElementById('check-avail-button');
const dateCalendar = document.getElementById('date-input');
const userInfo = document.querySelector('.user-booking-info')
const searchResultsList = document.querySelector('.search-listings');
const navUserOverview = document.getElementById('nav-overview');
const navUserLogout = document.getElementById('nav-logout');

loginButton.addEventListener('click', checkLoginInfo);
checkAvailButton.addEventListener('click', () => { dom.checkAvailability(dateCalendar.value) });

userInfo.addEventListener('click', (event) => {
  if (event.target.className === 'button res-cancel-button upcoming'
    && event.target.innerText !== 'Cancelled!') {
      verifyReservationCancel(event.toElement.id);
  } }
)

searchResultsList.addEventListener('click', (event) => {
  if (event.target.className === 'button make-res-button'
    && event.target.innerText !== 'Booked!') {
    const bookingData = event.toElement.id.split('-');
    verifyMakeReservation(bookingData);
  }
})

navUserOverview.addEventListener('click', () => {
  fetchSiteData(true);
  dom.switchView('.user-page');
})

navUserLogout.addEventListener('click', () => {
  location.reload();
})

window.onload = () => {
  fetchSiteData();
};

let runTime = true;
function fetchSiteData(isRefresh) {
  Promise.all([api.fetchData('rooms'), api.fetchData('bookings'), api.fetchData('users')])
    .then(value => {
      hotel.roomInfo = value[0];
      hotel.bookingInfo = value[1];
      hotel.userList = value[2];

      // SKIPPING LOGIN 
      if (runTime) {
        runTime = false;
        loginUser(40);
      }
      // SKIPPING LOGIN 

      if (isRefresh) {
        currentUser.updateUserInfo();
        dom.loadUserInfo(currentUser, userNameDisplay);
      }
    }
  )
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
  dom.retractHeader(headerDisplay);
  dom.switchView('.user-page');
  dom.loadUserInfo(currentUser, userNameDisplay);
  dom.displayNavLinks();
  setCalendarRange();
}

function setCalendarRange() {
  let todaysDate = dom.getDateToday();
  dateCalendar.setAttribute('min', todaysDate.replace(/\//g, "-"));
}

function verifyReservationCancel(reservationID) {
  if (!window.confirm("Are you sure you want to delete this reservation?")) return;
  currentUser.removeReservation(reservationID);
  dom.showCancelled(reservationID);
  // fetchSiteData(true);
}

function verifyMakeReservation(bookingData) {
  if (!window.confirm(`Make a reservation for Room ${bookingData[0]} on ${bookingData[1]}?`)) return;
  currentUser.makeReservation(currentUser.id, bookingData[1], bookingData[0]);
  dom.showBooked(bookingData.join('-'));
}