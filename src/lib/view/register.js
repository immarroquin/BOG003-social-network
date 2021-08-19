import {authEmailAndPassword} from '../index.js';


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
      <br>
      <button type="submit" id="btn-register">Crear Cuenta</button>
  </form> 
  
  <p>ya te registraste <a href="#/">inicia sesion</a></p>
  `
  divRegister.innerHTML = viewRegister;

const btnRegister = divRegister.querySelector("#btn-register");
btnRegister.addEventListener('click', () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  authEmailAndPassword(email, password);

})

  return divRegister;
};




