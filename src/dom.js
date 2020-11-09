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
          <button class="res-cancel-button ${timeframe}" id="${booking.id}">Cancel Reservation</button>
        </div>`)
    })
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
    const formattedDate = dateRequest.replace(/-/g, "/");
    let availRooms = hotel.getRoomAvailabilities(formattedDate);
    dom.switchView('.search-results');
    dom.buildSearchResultHTML(availRooms)
  },

  showCancelled(buttonId) {
    document.getElementById(buttonId).innerText = 'Cancelled!'
  },

  buildSearchResultHTML(availRooms) {
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
          <button>Book This Room</button>
        </li>
        <div class="divider"></div>`)
    })
  }
}

export default dom;