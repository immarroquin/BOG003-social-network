import { signOut, getPosts } from '../index.js';
// eslint-disable-next-line
import {
    defaultApp
} from '../configfirebase.js';

export const profile = () => {
    const divProfile = document.createElement('div');
    divProfile.setAttribute('id', 'div-profile');
    const viewProfile = `
    </html>
    <header id='hder'>
      <img id='logo-hder' src='img/logolaborafdonegro.png' alt='logo'>
      <div class='container-images'>
        <a href='#/home'><img id='img-home' src='img/Home.png' alt='home'></a>
        <a href='#/profile'><img id='img-profile' src='img/profile.png' alt='profile'></a>
      </div>
    </header>
    <main id='main-profile'>
        <div id='container-user-profile'></div>
        <div class='container-images'>
        <img id='imgprofile-functions' src='img/imgprofilefunctions.jpg' alt='logo' >
      </div>
      <button type='button' id='btn-signout'>CERRAR SESIÓN</button>
    </main>
    <footer id='footers'>©️ 2021 desarrollado por Diana, Gabriela y Lorena
</footer>`;

    divProfile.innerHTML = viewProfile;

    getPosts().onSnapshot(() => {
        const nameuid = firebase.auth().currentUser.displayName;

        const containerUserProfile = document.querySelector('#container-user-profile');
        containerUserProfile.innerHTML = '';
        containerUserProfile.innerHTML += `
        <img id='img-user-profile' src='img/profile.png' alt='profile'>
        <p>${nameuid}</p>
        `;
    });

    const btnSignOut = divProfile.querySelector('#btn-signout');
    btnSignOut.addEventListener('click', () => {
        signOut();
    });
    return divProfile;
}