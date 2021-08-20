// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';
// myFunction();
import { login } from './lib/view/login.js';
import {changeRoute} from './lib/router.js';


//document.getElementById('container').innerHTML = home();


const init = () => {
<<<<<<< HEAD
=======
    document.getElementById('container').appendChild(login());
>>>>>>> c64f9f3a3df9fadc8091d39077ede1b27b7a8646
    changeRoute(window.location.hash);
    window.addEventListener('hashchange', () => {
     //myFunction();
     changeRoute(window.location.hash);
     console.log(location.hash);

    })

}
window.addEventListener('load', init);