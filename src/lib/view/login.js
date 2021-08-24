import {signIn, authLogin, loginGoogle} from '../index.js'
// import {
//   home
// } from './home.js'
export const login = (hash) => {
  const divLogin = document.createElement('div');
  divLogin.setAttribute('class', 'container-div-login')
  const viewLogin = `
  <img src="img/logolaborafdoblanco.png" alt="logoLaboratorians" class="img-logo-white">
  <form id="formLogin"> 
  <div class="input-login">
    <input type="email" id="email">
    <input type="password" id="password">
  </div>
</form>
  <div id='errorMessageLogin' width:"100px" height:"100px" border:"solid"></div>
  <div class="div-login">
  <button id="btn-login" >Iniciar Sesion</button>
  <p>Tambien puedes iniciar sesión con:</p>
  <button type="button" id="btn-google-login">
  <img src="img/google.png" id="img-google"></button>
  <p>Si no tienes cuenta <a href="#/register" id='link-register'>Registrate</a></p>
  </div>
  `
  divLogin.innerHTML = viewLogin;
  const btnLogin = divLogin.querySelector("#btn-login");
  btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signIn(email, password);
    authLogin();
  })
  const btnGoogleLogin = divLogin.querySelector("#btn-google-login");
  btnGoogleLogin.addEventListener('click', () => {
    loginGoogle();
    
  
  })
  
  return divLogin;
}

//<button id="btn-login" onclick="window.location.href='#/home'">Iniciar Sesion</button>}
//<a href="#/home"id="btn-login">Iniciar Sesion</a>
//<button type="button" id="btn-login">Iniciar Sesion</button>