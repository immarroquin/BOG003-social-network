import {
  authEmailAndPassword,
  loginGoogle,
} from '../index.js';
// eslint-disable-next-line
import { defaultApp } from '../configfirebase.js';

export const register = () => {
  const divRegister = document.createElement('div');
  divRegister.setAttribute('class', 'container-div-register');
  const viewRegister = `
<img src='img/logolaborafdonegro.png' alt='logoLaboratorians' class='img-logo-white'>
 <form id='formRegister'>
 <div class='input-register'>
      <input type='text' id='name-register' placeholder='Escribe tu nombre'>
      <input type='email' id='email-register' placeholder='Correo@ejemplo.com'>
      <input type='password' id='password-register' placeholder='Contraseña'>

    <div id='modalContent'>
      <div id='textModal'></div>
      <img src='img/check.png' alt='verifiedCheck' class='img-check'>
    </div>
 </div>       
  </form> 
  <div id='errorMessageRegister'></div>
  <div class='div-register'>

  <button type='button' id='btn-register'>CREAR CUENTA</button>
  <p>También puedes registrarte con</p>
  <button type='button' class='btn-google'>
  <img src='img/google.png' id='img-google'>
  </button>
  <p>¿Ya te registraste? <a href='' id='link-login'>Inicia sesión</a></p>
  </div>`;
  divRegister.innerHTML = viewRegister;
  const btnRegister = divRegister.querySelector('#btn-register');
  btnRegister.addEventListener('click', () => {
    const formRegister = document.querySelector('#formRegister');
    const names = document.querySelector('#name-register').value;
    const email = document.querySelector('#email-register').value;
    const password = document.querySelector('#password-register').value;
    const errorMessage = document.querySelector('#errorMessageRegister');
    errorMessage.innerHTML = '';

    if (names !== '') {
      // usamos el metodo createUserWithEmailAndPassword para crear usuario con email y password
      authEmailAndPassword(email, password, names)
        .then(() => {
          document.querySelector('#modalContent').style.display = 'flex';
          document.querySelector('#textModal').innerHTML = 'Cuenta creada con exito, verifica tu correo';
          setTimeout(() => {
            document.querySelector('#modalContent').style.display = 'none';
          }, 3000);
          formRegister.reset();
        })
        .catch((error) => {
          const errorCode = error.code;

          // Creamos casos de error para registro de usuario nuevo
          switch (errorCode) {
            case 'auth/invalid-email':
              errorMessage.innerHTML = '⚠️ El correo debe ser válido';
              break;
            case 'auth/weak-password':
              errorMessage.innerHTML = '⚠️ La contraseña debe contener mínimo seis caracteres';
              break;
            case 'auth/email-already-in-use':
              errorMessage.innerHTML = '⚠️ Tu correo ya esta registrado, inicia sesión';
              break;

            default:
              errorMessage.innerHTML = 'Ups algo falló';
              break;
          }
        });
    } else {
      errorMessage.innerHTML = '⚠️ Nombre invalido';
    }
  });

  const btnGoogleRegister = divRegister.querySelector('.btn-google');
  btnGoogleRegister.addEventListener('click', () => {
    loginGoogle();// Funcion loginGoogle() para iniciar sesion con credenciales de google
  });
  return divRegister;
};
