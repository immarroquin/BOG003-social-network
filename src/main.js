// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';
// myFunction();
import { login } from './lib/view/login.js';
import {changeRoute} from './lib/router.js';


//document.getElementById('container').innerHTML = home();

document.getElementById('container').appendChild(login());
const init = () => {
    changeRoute(window.location.hash);
    window.addEventListener('hashchange', () => {
     //myFunction();
     changeRoute(window.location.hash);
     console.log(location.hash);

    })

}
window.addEventListener('load', init);