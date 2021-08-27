import {
  signIn,
  authLogin,
  loginGoogle,
} from '../index.js';

export const login = () => {
  const divLogin = document.createElement('div');
  divLogin.setAttribute('class', 'container-div-login');
  const viewLogin = `
  <img src='img/logolaborafdoblanco.png' alt='logoLaboratorians' class='img-logo-white'>
  <form id='formLogin'> 
  <div class='input-login'>
    <input type='email' id='email' placeholder='Correo@ejemplo.com'>
    <input type='password' id='password' placeholder='Contraseña'>
  </div>
</form>
  <div id='errorMessageLogin'></div>
  <div class='div-login'>
  <button id='btn-login' >INICIAR SESIÓN</button>
  <p>Tambien puedes iniciar sesión con</p>
  <button type='button' class='btn-google'>
  <img src='img/google.png' id='img-google'></button>
  <p>Si no tienes cuenta <a href='#/register' id='link-register'>Registrate</a></p>
  </div>
  `;
  divLogin.innerHTML = viewLogin;
  const btnLogin = divLogin.querySelector('#btn-login');
  btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signIn(email, password);
    authLogin();
  });
  const btnGoogleLogin = divLogin.querySelector('.btn-google');
  btnGoogleLogin.addEventListener('click', () => {
    loginGoogle();
  });

  return divLogin;
};
