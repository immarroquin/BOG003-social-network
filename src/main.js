import {
  login,
} from './lib/view/login.js';
import {
  showTemplate,
} from './lib/router.js';

const init = () => {
  document.getElementById('container').appendChild(login());
  showTemplate(window.location.hash);
  window.addEventListener('hashchange', () => {
    showTemplate(window.location.hash);
  });
};
window.addEventListener('load', init);
