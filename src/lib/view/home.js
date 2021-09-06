import {
  signOut,
  post,
  getPosts,
  deletePost,
  getPost,
  updatePost,
} from '../index.js';
// eslint-disable-next-line
import { defaultApp } from '../configfirebase.js';

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
  let editStatus = false;
  let id = '';
  divHome.innerHTML = viewHome;
  const btnInputModal = divHome.querySelector('#btn-input-modal');
  btnInputModal.addEventListener('click', () => {
    document.querySelector('#modal-background-post').style.display = 'block';
    document.querySelector('#modal-content-post').style.display = 'block';
  });
  
  const btnPost = divHome.querySelector('#btn-post');
  btnPost.addEventListener('click', async () => {
    const describe = document.querySelector('#input-post').value;
    const nameuid = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    // const date = new Date().getTime();
    if (describe !== '') {
      document.querySelector('#input-post').value = '';
    if (!editStatus) {
      await post(describe, nameuid, uid);
    } else {
     await updatePost(id, {
      description: describe,
      nameUser: nameuid,
      uidUser: uid,
      
     })
    }
    editStatus = false;
    document.querySelector('#btn-post').innerText = 'PUBLICAR';
    document.querySelector('#modal-background-post').style.display = 'none';
    document.querySelector('#modal-content-post').style.display = 'none';
    } else {
      alert('Escribe algo para publicar');
    }
  });
  
  getPosts().onSnapshot((response) => {
      const uid = firebase.auth().currentUser.uid;
       const divPosts= document.querySelector('#div-post'); 
        divPosts.innerHTML = '';
        response.forEach((doc) => {
          divPosts.innerHTML += `
          <div class= "card-post">
          <p>${doc.data().nameUser}</p>
          
          ${uid === doc.data().uidUser ? `
          <button type='button' class='btn-delete' data-id='${doc.id}'>Eliminar</button></div>
          <button type='button' class='btn-edit' data-id='${doc.id}'>Editar</button></div>` : ''}
          <p>${doc.data().description}</p>
          </div>`
          const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(btn =>{
      btn.addEventListener('click', async (e) =>{
        await deletePost(e.target.dataset.id);
      });
    });
    
    const btnEdit = document.querySelectorAll('.btn-edit');
    //document.querySelector('#input-post').value = '';
    btnEdit.forEach(btn =>{
      btn.addEventListener('click', async (e) =>{
       const editDoc = await getPost(e.target.dataset.id);
        console.log(editDoc.data());
        editStatus = true;
        id = editDoc.id;
        document.querySelector('#input-post').value = editDoc.data().description;
        document.querySelector('#btn-post').innerText = 'GUARDAR';
        document.querySelector('#modal-background-post').style.display = 'block';
        document.querySelector('#modal-content-post').style.display = 'block';
        
      });
    });
        });
    
    
  });

  const btnSignOut = divHome.querySelector('#btn-signout');
  btnSignOut.addEventListener('click', () => {
    signOut();
  });
  return divHome;
};
