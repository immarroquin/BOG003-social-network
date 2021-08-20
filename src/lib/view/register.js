import {authEmailAndPassword} from '../index.js';
import {validNameRegister} from '../index.js';
//import {emailVerification} from '../index.js';

export const register = () => {
  const divRegister = document.createElement('div');   
  const viewRegister = `

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

  <div id="divErrorMessage" width:"100px" height:"100px" border:"solid"></div>

  <button type="button" id="btn-register">Crear Cuenta</button>
  <p>ya te registraste <a href="">inicia sesion</a></p>
  `


  divRegister.innerHTML = viewRegister;
const btnRegister = divRegister.querySelector("#btn-register");
btnRegister.addEventListener('click', () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const names = document.querySelector('#name').value;
  authEmailAndPassword(email, password, names);
  validNameRegister(namesd);
})

  return divRegister;
};




