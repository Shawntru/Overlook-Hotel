let dom = {
  
  getLoginCreds(textbox) {
    return document.getElementById(`${textbox}-input`).value;
  },

  switchView(view) {
    const views = ['.user-page', '.login-page'];
    views.forEach(view => document.querySelector(view).classList.add('hidden'));
    document.querySelector(view).classList.remove('hidden');
  },

  loadUserInfo(user, section){
    section.innerHTML = `<p>${user.name}</p>`;
  }

}

export default dom;