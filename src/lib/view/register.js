import {authEmailAndPassword, loginGoogle} from '../index.js';
//import {validNameRegister} from '../index.js';
//import {emailVerification} from '../index.js';

export const register = () => {
  const divRegister = document.createElement('div');
  document.body.classList.remove("styleBodyBlack");
  document.body.classList.add("body");
  
  divRegister.setAttribute("class", "container-div-register");
  const viewRegister = `
<img src="img/logolaborafdonegro.png" alt="logoLaboratorians" class="img-logo-white">
 <form id="formRegister">
 <div class="input-register">
      <input type="text" id="name-register" placeholder='Escribe tu nombre'>
      <input type="email" id="email-register" placeholder='Correo@ejemplo.com'>
      <input type="password" id="password-register" placeholder='Contraseña'>
 </div>       
  </form> 
  <div id="errorMessageRegister"></div>
  <div class="div-register">

  <button type="button" id="btn-register">CREAR CUENTA</button>
  <p>También puedes registrarte con</p>
  <button type="button" class="btn-google">
  <img src="img/google.png" id="img-google">
  </button>

  <p>¿Ya te registraste? <a href="" id='link-login'>Inicia sesión</a></p>
  

  </div>
  `


  divRegister.innerHTML = viewRegister;
const btnRegister = divRegister.querySelector('#btn-register');
btnRegister.addEventListener('click', () => {
  const names = document.querySelector('#name-register').value;
  const email = document.querySelector('#email-register').value;
  const password = document.querySelector('#password-register').value;
  const errorMessage = document.querySelector('#errorMessageRegister');
  if(names !== ""){
    authEmailAndPassword(email, password, names);
  }else {
    errorMessage.innerHTML = '⚠️ Nombre invalido';
  }
 
  
})

const btnGoogleRegister = divRegister.querySelector(".btn-google");
btnGoogleRegister.addEventListener('click', () => {
  loginGoogle();


})
  return divRegister;

};




