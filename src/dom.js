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

  checkAvailability() {
    const dateRequest = document.getElementById('date-input').value;
    let availRooms = hotel.getRoomAvailabilities(dateRequest);
    this.switchView('.search-results');
    console.log(availRooms);
  }

}

export default dom;