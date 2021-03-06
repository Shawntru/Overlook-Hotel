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
import managerChart from './manager-chart';

let currentUser;

const loginButton = document.getElementById('login-button');
const userNameDisplay = document.querySelector('.user-display-name');
const headerDisplay = document.querySelector('.header');
const checkAvailButton = document.getElementById('check-avail-button');
const dateCalendar = document.getElementById('date-input');
const userInfo = document.querySelector('.user-booking-info');
const searchResultsList = document.querySelector('.search-listings');
const navUserOverview = document.getElementById('nav-overview');
const navUserLogout = document.getElementById('nav-logout');
const navManagerOverview = document.getElementById('nav-manager');
const viewUserButton = document.getElementById('view-user-button');
const managerUserList = document.getElementById('customer-list');
const dailyStats = document.querySelector('.daily-stats');
const filterSearchButton = document.getElementById('search-filter-button');
const loginBlock = document.querySelector('.login-block');

loginButton.addEventListener('click', checkLoginInfo);
checkAvailButton.addEventListener('click', () => { dom.checkAvailability(dateCalendar.value); });

viewUserButton.addEventListener('click', () => {
  if (managerUserList.value === 'none') return;
  currentUser = new User(parseInt(managerUserList.value), 10);
  dom.switchView('.user-page');
  dom.loadUserInfo(currentUser, userNameDisplay);
});

navManagerOverview.addEventListener('click', () => {
  dom.switchView('.manager-chart');
});

filterSearchButton.addEventListener('click', () => {
  const e = document.getElementById('search-filter');
  dom.checkAvailability(dateCalendar.value, e.value);
});

userInfo.addEventListener('click', (event) => {
  if (event.target.className === 'button res-cancel-button upcoming'
    && event.target.innerText !== 'Cancelled!') {
    verifyReservationCancel(event.toElement.id);
  }
});

searchResultsList.addEventListener('click', (event) => {
  if (event.target.className === 'button make-res-button'
    && event.target.innerText !== 'Booked!') {
    const bookingData = event.toElement.id.split('-');
    verifyMakeReservation(bookingData);
  }
});

navUserOverview.addEventListener('click', () => {
  if (currentUser.id === 'Manager') return;
  fetchSiteData(true);
  dom.switchView('.user-page');
});

navUserLogout.addEventListener('click', () => {
  location.reload();
});

window.onload = () => {
  fetchSiteData();
};

function fetchSiteData(isRefresh) {
  Promise.all([api.fetchData('rooms'), api.fetchData('bookings'), api.fetchData('users')])
    .then((value) => {
      hotel.roomInfo = value[0];
      hotel.bookingInfo = value[1];
      hotel.userList = value[2];
      if (isRefresh) {
        currentUser.updateUserInfo();
        dom.loadUserInfo(currentUser, userNameDisplay);
      }
    });
}

function checkLoginInfo() {
  const username = dom.getLoginCreds('username').value;
  const password = dom.getLoginCreds('password').value;
  if (username === 'manager' && password === 'overlook2020') {
    loginManager();
    return;
  }
  const userId = parseInt(username.slice(8, username.length), 10);
  if (isValidLogin(username, password, userId)) {
    loginUser(userId);
  } else {
    dom.badLogin(loginBlock);
  }
}

function isValidLogin(username, password, userId) {
  return !(
    username.slice(0, 8) !== 'customer'
    || userId < 1
    || userId > 50
    || password !== 'overlook2020');
}

function loginUser(userId) {
  currentUser = new User(userId);
  loginAnimations();
  dom.switchView('.user-page');
  dom.loadUserInfo(currentUser, userNameDisplay);
}

function loginAnimations() {
  dom.displayNavLinks();
  dom.retractHeader(headerDisplay);
  setCalendarRange();
}

function loginManager() {
  currentUser = new Manager('Manager');
  loginAnimations();
  dom.switchView('.manager-chart');
  dom.buildManagerDash(currentUser, dailyStats, managerChart);
}

function setCalendarRange() {
  const todaysDate = dom.getDateToday();
  dateCalendar.setAttribute('min', todaysDate.replace(/\//g, '-'));
}

function verifyReservationCancel(reservationID) {
  currentUser.removeReservation(reservationID);
  dom.showCancelled(reservationID);
  setTimeout(() => { fetchSiteData(true); }, 1000);
}

function verifyMakeReservation(bookingData) {
  currentUser.makeReservation(currentUser.id, bookingData[1], bookingData[0]);
  dom.showBooked(bookingData.join('-'));
  setTimeout(() => {
    fetchSiteData(true);
    dom.switchView('.user-page');
  }, 1000);
}
