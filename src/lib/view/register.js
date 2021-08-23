import {authEmailAndPassword, loginGoogle} from '../index.js';
//import {validNameRegister} from '../index.js';
//import {emailVerification} from '../index.js';

export const register = () => {
  const divRegister = document.createElement('div');
  document.body.classList.remove("styleBodyBlack");
  document.body.classList.add("body");
  
  divRegister.setAttribute("id", "div-register");
  const viewRegister = `
<img src="img/logolaborafdonegro.png" alt="logoLaboratorians" class="img-logo-white">
<form id="formRegister">
      <input type="text" id="name">
      <br>
      <br>
      <input type="email" id="email">
      <br>
      <br>
      <input type="password" id="password">
      <br>
      
  </form> 
  
  <div id="errorMessageRegister" width:"100px" height:"100px" border:"solid"></div>

  <button type="button" id="btn-register">Crear Cuenta</button>
  <button type="button" id="btn-google-register">Google Register</button>

  <p>ya te registraste <a href="">inicia sesion</a></p>
  `


  divRegister.innerHTML = viewRegister;
const btnRegister = divRegister.querySelector("#btn-register");
btnRegister.addEventListener('click', () => {
  const names = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const errorMessage = document.querySelector('#errorMessageRegister');
  if(names !== ""){
    authEmailAndPassword(email, password, names);
  }else {
    errorMessage.innerHTML = 'Nombre invalido';
  }
  
  
})

const btnGoogleRegister = divRegister.querySelector("#btn-google-register");
btnGoogleRegister.addEventListener('click', () => {
  loginGoogle();


})
  return divRegister;

};




