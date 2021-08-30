import {
  signOut,
} from '../index.js';
// eslint-disable-next-line
import {defaultApp} from '../configfirebase.js';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
    <h1>Bienvenidos a Laboratorians </h1>
    <br>
    <button type='button' id='btn-signout'>Cerrar Sesion</button>`;
  divHome.innerHTML = viewHome;
  const btnSignOut = divHome.querySelector('#btn-signout');
  btnSignOut.addEventListener('click', () => {
    signOut();
  });
  return divHome;
};
