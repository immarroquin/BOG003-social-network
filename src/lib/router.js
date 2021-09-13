import {
  login,
} from './view/login.js';
import {
  register,
} from './view/register.js';
import {
  home,
} from './view/home.js';
import {
  profile,
} from './view/profile.js';

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
    case '#/profile':
      containerRoot.appendChild(profile());
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
  } if (hash === '#/profile') {
    return showTemplate(hash);
  }
  return showTemplate(hash);
};
