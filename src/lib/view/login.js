import {
  signIn
} from '../index.js'
// import {
//   home
// } from './home.js'
export const login = (hash) => {
  const divLogin = document.createElement('div');
  const viewLogin = `
    <form id="formLogin"> 
      <input type="email" id="email">
      <br>
      <br>
      <input type="password" id="password">
      <br>
      <br>
      
  </form>
  <div id="errorMessageLogin" width:"100px" height:"100px" border:"solid"></div>

  <a href="#/home"id="btn-login">Iniciar Sesion</a>
  <p>Si no tienes cuenta <a href="#/register">Registrate</a></p>
  `
  divLogin.innerHTML = viewLogin;
  const btnLogin = divLogin.querySelector("#btn-login");
  btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signIn(email, password);
  })

  return divLogin;
}