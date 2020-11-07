let dom = {
  
  getLoginCreds(textbox) {
    return document.getElementById(`${textbox}-input`).value;
  },

  switchView(view) {
    const views = ['.user-page', '.login-page'];
    views.forEach(view => document.querySelector(view).classList.add('hidden'));
    document.querySelector(view).classList.remove('hidden');
  },

  loadUserInfo(user, title){
    title.innerText = user.name;
    const dateToday = this.getDateToday();
    let timeframe;
    user.bookings.forEach(booking => {
      if (booking.date > dateToday) timeframe = 'upcoming';
      else timeframe = 'past';
      document.getElementById(`${timeframe}-stays`).insertAdjacentHTML('beforeend',
        `<p>Date: ${booking.date} | Room #: ${booking.roomNumber} <br> Confirmation #: ${booking.id}</p>`)
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
    header.style.height = '3em';
  }

}

export default dom;