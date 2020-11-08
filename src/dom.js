import hotel from './hotel';

let dom = {
  
  getLoginCreds(textbox) {
    return document.getElementById(`${textbox}-input`).value;
  },

  switchView(view) {
    const views = ['.user-page', '.login-page'];
    views.forEach(view => document.querySelector(view).classList.add('hidden'));
    document.querySelector(view).classList.remove('hidden');
  },

  loadUserInfo(user, element){
    this.displayNameAndLoyalty(user, element);
    const dateToday = this.getDateToday();
    let timeframe;
    user.bookings.forEach(booking => {
      if (booking.date > dateToday) timeframe = 'upcoming';
      else timeframe = 'past';
      document.getElementById(`${timeframe}-stays`).insertAdjacentHTML('beforeend',
      `<p class="stay-listing">Date: ${booking.date} | Room #: ${booking.roomNumber} <br> Confirmation #: ${booking.id}</p>`)
    })
  },
  
  displayNameAndLoyalty(user, element) {
    let loyaltyLevel = 'Bronze Initiate';
    if (user.totalSpent > 5000) loyaltyLevel = 'Silver Plus';
    if (user.totalSpent > 7000) loyaltyLevel = 'Gold Partner';
    if (user.totalSpent > 9000) loyaltyLevel = 'Platinum Elite';
    element.innerText = user.name;
    document.querySelector('.user-display-loyalty')
      .innerText = `Member Loyalty Level: ${loyaltyLevel} (${user.totalSpent} Reward Points)`;
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
    header.style.height = '3em';
  },

  checkAvailability() {
    const dateRequest = document.getElementById('date-input').value;
    let availRooms = hotel.getRoomAvailabilities(dateRequest);
    console.log(availRooms);
  }

}

export default dom;