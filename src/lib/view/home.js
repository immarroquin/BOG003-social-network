import {
  signOut,
  post,
} from '../index.js';
// eslint-disable-next-line
import {defaultApp} from '../configfirebase.js';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
    <h1>Bienvenidos a Laboratorians </h1>
<div id='container-posts'>
  <div id='container-btn-input'>
   <button type='button' id='btn-input-modal'>Cuentanos tu experiencia laboratorians</button>
  </div>
   <div id='modal-background-post'>
     <div id='modal-content-post'>
           <input type='text' id='input-post' placeholder='Cuentanos tu experiencia laboratorians'>
          <button type='button' id='btn-post'>PUBLICAR</button>
     </div>
     
  </div>
  <div id='div-post'></div>
</div>
<button type='button' id='btn-signout'>Cerrar Sesion</button>
`;
  divHome.innerHTML = viewHome;
  const btnInputModal = divHome.querySelector('#btn-input-modal');
  btnInputModal.addEventListener('click', () => { 
      document.querySelector('#modal-background-post').style.display = 'block';
      document.querySelector('#modal-content-post').style.display = 'block';
   });
   const btnPost = divHome.querySelector('#btn-post');
      btnPost.addEventListener('click', () => { 
        const describe = document.querySelector('#input-post').value;
        post(describe);
        document.querySelector('#modal-background-post').style.display = 'none';
        document.querySelector('#modal-content-post').style.display = 'none';
       document.querySelector('#div-post').innerHTML = describe;
       document.querySelector('#div-post').style.display ='block';
           });
          
         const btnSignOut = divHome.querySelector('#btn-signout');
  btnSignOut.addEventListener('click', () => {
    signOut();
  });
  return divHome;
};
