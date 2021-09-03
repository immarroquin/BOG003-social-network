import {
  signOut,
  post,
  getPosts,
  deletePost,
} from '../index.js';
// eslint-disable-next-line
import { defaultApp } from '../configfirebase';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
  </html>
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
    <div id='div-post'>
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
    // document.getElementById('div-post').appendChild(getPost());

  });
  
  getPosts().onSnapshot((response) => {
    const divPosts= document.querySelector('#div-post');
    const names = firebase.auth().currentUser.displayName;
    divPosts.innerHTML = '';
    response.forEach((doc) => {
      console.log(doc.data());
      divPosts.innerHTML += `
      <div class= "card-post">
      <p>${names}</p>
      <p>${doc.data().description}</p>
      <button type='button' class='btn-delete' data-id='${doc.id}'>Eliminar</button></div>
      </div>`
      const btnDelete = document.querySelectorAll('.btn-delete');
btnDelete.forEach(btn =>{
  btn.addEventListener('click', async (e) =>{
    await deletePost(e.target.dataset.id);
  })
})

    });

    //  getPost().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {

    //     console.log(doc.data());
    //   });
    // });
  });



  // const divPost = 



  // const btnMostrar = 
  // const querySnapshot = await getPost();
  //   querySnapshot.forEach(doc => {


  //     });
  // document.addEventListener('DOMContentLoaded', (event) => {
  //   console.log('DOM fully loaded and parsed');
  // });

  //  window.addEventListener('DOMContentLoaded', e => {
  //    console.log(e + "Laboratorians");

  //  });

  const btnSignOut = divHome.querySelector('#btn-signout');
  btnSignOut.addEventListener('click', () => {
    signOut();
  });
  return divHome;
};
