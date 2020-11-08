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
    const dateToday = this.getDateToday();
    element.innerText = user.name;
    document.querySelector('.user-display-loyalty')
      .innerText = `Member Loyalty Level: ${user.loyaltyLevel} (${user.totalSpent} Reward Points)`;
    let timeframe;
    user.bookings.forEach(booking => {
      if (booking.date >= dateToday) timeframe = 'upcoming';
      else timeframe = 'past';
      document.getElementById(`${timeframe}-stays`)
        .insertAdjacentHTML('beforeend',
        `<p class="stay-listing">Date: ${booking.date} | Room #: ${booking.roomNumber} 
        <br> Confirmation #: ${booking.id}</p>`)
    })
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
    console.log(availRooms);
  },

  buildSearchResultHTML(availRooms) {
    const searchResults = document.querySelector('.search-listings');
    let bidetBlurb = "";
    availRooms.forEach(room => {
      let picNumber = Math.round(Math.random() * 10)
      if (room.bidet) bidetBlurb = ", and a luxury Bidet";
      else bidetBlurb = "";
      searchResults.insertAdjacentHTML('beforeend',
      ` <li class="room-result-block">
          <img id="room-image" src="./images/room-${picNumber}.jpg" alt="Photo of Room">
          <div class="room-information">
            <h3>${room.roomType}, ${room.number}</h3>
            <p>${room.numBeds} ${room.bedSize} size beds${bidetBlurb}.</p>
            <p>Nightly Rate:  $${room.costPerNight}</p>
          </div>
          <button>Book This Room</button>
        </li>`)
    })
  }
}

export default dom;