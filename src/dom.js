import hotel from './hotel';

let dom = {
  
  getLoginCreds(textbox) {
    return document.getElementById(`${textbox}-input`).value;
  },

  switchView(view) {
    const views = ['.user-page', '.login-page', '.search-results'];
    views.forEach(view => document.querySelector(view).classList.add('hidden'));
    document.querySelector(view).classList.remove('hidden');
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
    //SKIPPING DATE INPUT
    if (!dateRequest) return;
    //SKIPPING DATE INPUT
    const formattedDate = dateRequest.replace(/-/g, "/");
    let availRooms = hotel.getRoomAvailabilities(formattedDate);
    dom.switchView('.search-results');
    dom.buildSearchResultHTML(availRooms, formattedDate)
  },

  showCancelled(buttonId) {
    document.getElementById(buttonId).innerText = 'Cancelled!';
    setTimeout(() => {}, 3000);
  },

  showBooked(bookingData) {
    document.getElementById(bookingData).innerText = 'Booked!';
  },

  buildSearchResultHTML(availRooms, formattedDate) {
    const searchResults = document.querySelector('.search-listings');
    let bidetBlurb = "";
    availRooms.forEach(room => {
      if (room.bidet) bidetBlurb = " and a Luxury Bidet";
      else bidetBlurb = "";
      const uppercaseBedSize = room.bedSize.charAt(0).toUpperCase() + room.bedSize.slice(1);
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
    })
  }
}

export default dom;