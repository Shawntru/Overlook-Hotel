let dom = {
  
  getLoginCreds(textbox) {
    return document.getElementById(`${textbox}-input`).value;
  }

}

export default dom;

