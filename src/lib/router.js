import {
  login,
} from './view/login.js';
import {
  register,
} from './view/register.js';
import {
  home,
} from './view/home.js';

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('container');
  containerRoot.innerHTML = '';

  switch (hash) {
    case '':
      containerRoot.appendChild(login());
      break;
    case '#/register':
      containerRoot.appendChild(register());
      break;
    case '#/home':
      containerRoot.appendChild(home());
      break;
    default:
      containerRoot.innerHTML = 'Ups Error 404';
  }
};

export const changeRoute = (hash) => {
  if (hash === '#/') {
    return showTemplate(hash);
  } if (hash === '#/register') {
    return showTemplate(hash);
  } if (hash === '#/home') {
    return showTemplate(hash);
  }
  return showTemplate(hash);
};
