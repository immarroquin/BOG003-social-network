import {signIn, authLogin, loginGoogle} from '../index.js'
// import {
//   home
// } from './home.js'
export const login = (hash) => {
  const divLogin = document.createElement('div');
  divLogin.setAttribute('class', 'container-div-login')
  const viewLogin = `
  <body id='body-login'>
    <form id="formLogin"> 
      <input type="email" id="email">
      <br>
      <br>
      <input type="password" id="password">
      <br>
      <br>
      
  </form>
  <div id="errorMessageLogin" width:"100px" height:"100px" border:"solid"></div>
  
  <button id="btn-login" >Iniciar Sesion</button>
  <button type="button" id="btn-google-login">Google Login</button>
 
  <p>Si no tienes cuenta <a href="#/register">Registrate</a></p>
  
</body>
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