import hotel from './hotel';

let dom = {
  
  getLoginCreds(textbox) {
    return document.getElementById(`${textbox}-input`);
  },

  switchView(inputView) {
    scroll(0, 0);
    const views = ['.user-page', '.login-page', '.search-results', '.manager-chart'];
    views.forEach(view => document.querySelector(view).classList.add('hidden'));
    document.querySelector(inputView).classList.remove('hidden');
  },

  badLogin(element) {
    element.classList.toggle('shake');
    setTimeout(() => {
      element.classList.toggle('shake');
    }, 820);
    this.getLoginCreds('username').value = "";
    this.getLoginCreds('password').value = "";
  },

  loadUserInfo(user, element){
    this.clearUserInfo();
    this.displayUserNameLoyalty(user, element);
    const dateToday = this.getDateToday();
    let timeframe;
    let hasUpcoming = false;
    user.bookings.forEach(booking => {
      if (booking.date >= dateToday) {
        timeframe = 'upcoming';
        hasUpcoming = true;
      }
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
    if (!hasUpcoming) this.displayNoUpcoming() 
  },

  displayNoUpcoming() {
    const upcomingStays = document.getElementById('upcoming-stays');
    upcomingStays.insertAdjacentHTML('afterend', 
      `<h4 class="apology">You have no upcoming stays. Use the calendar to book a new stay!</h4>`);
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

  getDateToday(dayModifier) {
    let date = new Date();
    if (dayModifier) {
      date.setDate(date.getDate() + dayModifier);
    }
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
  },

  retractHeader(header) {
    header.style.transition = 'ease 1s';
    header.style.height = '4em';
  },

  showCancelled(buttonId) {
    document.getElementById(buttonId).innerText = 'Cancelled!';
  },

  showBooked(bookingData) {
    document.getElementById(bookingData).innerText = 'Booked!';
  },

  buildManagerDash(currentUser, dailyStats, managerChart) {
    this.getManagementStats(dailyStats);
    this.buildChartRevenueData(managerChart);
    this.addManagerNav();
    const managerPage = document.querySelector('.manager-page');
    const customerList = document.getElementById('customer-list');
    managerPage.classList.remove('hidden');
    currentUser.userList.forEach(user => {
      customerList.insertAdjacentHTML('beforeend', `
        <option value="${user.id}">User ${user.id}  -  ${user.name}</option>`)
    });
  },

  addManagerNav() {
    const navManager = document.getElementById('nav-manager')
    navManager.classList.remove('hidden');
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

  checkAvailability(dateRequest, type) {
    if (!dateRequest) return;
    const formattedDate = dateRequest.replace(/-/g, "/");
    let availRooms = hotel.getRoomAvailabilities(formattedDate);
    if (type) {
      availRooms = hotel.filterRoomsByType(availRooms, type);
    }
    dom.switchView('.search-results');
    dom.buildSearchResult(availRooms, formattedDate);
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

  buildChartDates() {
    let day = 0;
    let daysOfWeek = [];
    while (daysOfWeek.length < 30) {
      daysOfWeek.push(dom.getDateToday(day));
      day++;
    }
    return daysOfWeek;
  },

  buildChartRevenueData(managerChart) {
    const dates = this.buildChartDates();
    const revenues = dates.reduce((revAmounts, date) => {
      revAmounts.push(hotel.getDailyRevenue(date));
      return revAmounts;
    }, [])
    managerChart.data.datasets[0].data = revenues;
  }

}

export default dom;