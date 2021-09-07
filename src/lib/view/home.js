import {
  signOut,
  post,
  getPosts,
  deletePost,
  getPost,
  updatePost,
  like,
  dislike,
} from '../index.js';
// eslint-disable-next-line
import {
  defaultApp
} from '../configfirebase.js';
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
        <button disabled type='button' id='btn-post'>PUBLICAR</button>
      </div>  
    </div>
    <div id='div-post'></div>
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

  const inputPost = divHome.querySelector('#input-post');
  inputPost.addEventListener('keyup', () => {
    const valueInput = inputPost.value;
    if (valueInput == '') {
      document.querySelector('#btn-post').disabled = true;
    } else {
      document.querySelector('#btn-post').disabled = false;
    }
  });

  const btnPost = divHome.querySelector('#btn-post');
  btnPost.addEventListener('click', async () => {
    const describe = document.querySelector('#input-post').value;
    const nameuid = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    const getdate = new Date();
    const date = getdate.getDate() + '/' + (getdate.getMonth()+1) + '/' + getdate.getFullYear();
    console.log(date);
    if (describe !== '') {
      document.querySelector('#input-post').value = '';
      if (!editStatus) {
        await post(describe, nameuid, uid, date);
      } else {
        await updatePost(id, {
          description: describe,
          nameUser: nameuid,
          uidUser: uid,
          currentDate : date,
        })
      }
      editStatus = false;
      document.querySelector('#btn-post').innerText = 'PUBLICAR';
      document.querySelector('#modal-background-post').style.display = 'none';
      document.querySelector('#modal-content-post').style.display = 'none';
    }
  });

  getPosts().onSnapshot((response) => {
    const uid = firebase.auth().currentUser.uid;
    const divPosts = document.querySelector('#div-post');
    divPosts.innerHTML = '';
    response.forEach((doc) => {
      divPosts.innerHTML += `
          <div class= "card-post">
          <p>${doc.data().nameUser}</p>
          <p>${doc.data().currentDate}</p>
          ${uid === doc.data().uidUser ? `
          <button type='button' class='btn-delete' data-id='${doc.id}'>Eliminar</button></div>
          <button type='button' class='btn-edit' data-id='${doc.id}'>Editar</button></div>` : ''}
          <p>${doc.data().description}</p>
          ${doc.data().likes.includes(uid) ? `
         <img src='img/like.png' class='img-like' data-id='${doc.id}'><span>${doc.data().likes.length}</span></`: ` <img src='img/dislike.png' class='img-like' data-id='${doc.id}'><span>${doc.data().likes.length}</span>` }
          </div>`;
      const btnDelete = document.querySelectorAll('.btn-delete');
      btnDelete.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          await deletePost(e.target.dataset.id);
        });
      });

      const btnEdit = document.querySelectorAll('.btn-edit');
      //document.querySelector('#input-post').value = '';
      btnEdit.forEach(btn => {
        btn.addEventListener('click', async (e) => {
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
      
      const btnLike = document.querySelectorAll('.img-like');
      btnLike.forEach( btn =>{
        btn.addEventListener('click' , async (e) =>{
          const likeDoc = await getPost(e.target.dataset.id);
          const likeUser = likeDoc.data().likes;
          console.log(likeUser);
          if(likeUser.includes(uid)){
          dislike(uid , e.target.dataset.id);
          } else{
          like(uid, e.target.dataset.id);
          }
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