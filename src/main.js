// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';
import { home } from './lib/view/home.js';
import { login } from './lib/view/login.js';
// myFunction();

document.getElementById('container').innerHTML = home();

document.getElementById('container').innerHTML = login();