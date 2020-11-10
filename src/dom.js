import hotel from './hotel';

let dom = {
  
  getLoginCreds(textbox) {
    return document.getElementById(`${textbox}-input`).value;
  },

  switchView(inputView) {
    scroll(0, 0);
    const views = ['.user-page', '.login-page', '.search-results'];
    views.forEach(view => document.querySelector(view).classList.add('hidden'));
    if (!inputView) return;
    document.querySelector(inputView).classList.remove('hidden');
  },

  loadUserInfo(user, element){
    this.clearUserInfo();
    this.displayUserNameLoyalty(user, element);
    const dateToday = this.getDateToday();
    let timeframe;
    user.bookings.forEach(booking => {
      if (booking.date >= dateToday) timeframe = 'upcoming';
      else timeframe = 'past';
      document.getElementById(`${timeframe}-stays`)
        .insertAdjacentHTML('beforeend', `
        <div class="upcoming-entry">
          <div>
            <p class="stay-listing">Date: ${booking.date} | Room #: ${booking.roomNumber} 
            <br> Confirmation #: ${booking.id}</p>
          </div>
          <button class="button res-cancel-button ${timeframe}" id="${booking.id}">Cancel Reservation</button>
        </div>`)
    })
  },

  clearUserInfo() {
    const userInfo = document.querySelector('.user-booking-info');
    userInfo.innerHTML = 
      `<article id="upcoming-stays">
        <h3 class="stay-details">Upcoming Stays:</h3>
      </article>
      <article id="past-stays">
        <h3 class="stay-details">Past Stays:</h3>
      </article>`;
  },

  displayNavLinks() {
    const navBar = document.querySelector('.navigation');
    navBar.classList.remove('hidden');
  },

  displayUserNameLoyalty(user, element) {
    element.innerText = user.name;
    document.querySelector('.user-display-loyalty')
      .innerText = `Member Loyalty Level: ${user.loyaltyLevel} (${user.totalSpent} Reward Points)`;
  },

  getDateToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
  },

  retractHeader(header) {
    header.style.transition = 'ease 1s';
    header.style.height = '4em';
  },

  checkAvailability(dateRequest) {
    if (!dateRequest) return;
    const formattedDate = dateRequest.replace(/-/g, "/");
    let availRooms = hotel.getRoomAvailabilities(formattedDate);
    dom.switchView('.search-results');
    dom.buildSearchResult(availRooms, formattedDate)
  },

  showCancelled(buttonId) {
    document.getElementById(buttonId).innerText = 'Cancelled!';
  },

  showBooked(bookingData) {
    document.getElementById(bookingData).innerText = 'Booked!';
  },

  buildManagerDash(currentUser, dailyStats) {
    this.getManagementStats(dailyStats);
    const managerPage = document.querySelector('.manager-page');
    const customerList = document.getElementById('customer-list');
    managerPage.classList.remove('hidden');
    currentUser.userList.forEach(user => {
      customerList.insertAdjacentHTML('beforeend', `
        <option value="${user.id}">User: ${user.id}  -  ${user.name}</option>`)
    });
  },

  getManagementStats(dailyStats) {
    const today = this.getDateToday();
    const availableRooms = hotel.getRoomAvailabilities(today).length;
    const vacancyRatio = Math.round((availableRooms / 25) * 100);
    const revenueToday = hotel.getDailyRevenue(today);
    dailyStats.innerHTML =
      `<h4>Rooms Available Today:  ${availableRooms}  (${vacancyRatio}% Vacancy)</h4>
      <br>
      <h4>Total Revenue Today:  $${revenueToday}</h4>`
  },

  buildSearchResult(availRooms, formattedDate) {
    const searchResults = document.querySelector('.search-listings');
    searchResults.innerHTML = `<ul class="search-listings"></ul>`;
    if (!availRooms) {
      searchResults.innerHTML = 
        `<h1 class="apology">Sorry, There are No Vacancies for ${formattedDate}</h1>`;
      return;
    }
    let bidetBlurb = "";
    availRooms.forEach(room => {
      if (room.bidet) bidetBlurb = " and a Luxury Bidet";
      else bidetBlurb = "";
      const uppercaseBedSize = room.bedSize.charAt(0).toUpperCase() + room.bedSize.slice(1);
      this.createResultHTML(searchResults, formattedDate, bidetBlurb, room, uppercaseBedSize);
    })
  },
  
  createResultHTML(searchResults, formattedDate, bidetBlurb, room, uppercaseBedSize) {
      searchResults.insertAdjacentHTML('beforeend',
        ` <li class="room-result-block">
          <img id="room-image" src="./images/room-${Math.round(Math.random() * 10)}.jpg" alt="Photo of Room">
          <div class="room-information">
            <h3>Room ${room.number}</h3>
            <h5>${room.roomType.toUpperCase()}</h5>
            <p>${room.numBeds} ${uppercaseBedSize} Size Beds${bidetBlurb}.</p>
            <p>Nightly Rate:  $${room.costPerNight}</p>
          </div>
          <button class="button make-res-button" id="${room.number}-${formattedDate}">Book This Room</button>
        </li>
        <div class="divider"></div>`)
  },

}

export default dom;