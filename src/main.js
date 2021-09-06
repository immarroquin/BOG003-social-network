import {
  login,
} from './lib/view/login.js';
import {
  changeRoute,
} from './lib/router.js';

const init = () => {
  document.getElementById('container').appendChild(login());
  changeRoute(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeRoute(window.location.hash);
  });
};
window.addEventListener('load', init);
