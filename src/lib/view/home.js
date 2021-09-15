import {
  post,
  getPosts,
  deletePost,
  getPost,
  updatePost,
  like,
  dislike,
} from '../index.js';
// eslint-disable-next-line
import {defaultApp} from '../configfirebase.js';
export const home = () => {
  const divHome = document.createElement('div');
  divHome.setAttribute('id', 'div-home');
  const viewHome = `
</html>
<header id='hder'>
<img id='logo-hder' src='img/logolaborafdonegro.png' alt='logo'>
<div class='container-images'>
<a href='#/home'><img id='img-home' src='img/Home.png' alt='home'></a>
<a href='#/profile'><img id='img-profile' src='img/profile.png' alt='profile'></a>
</div>
</header>
<main id='container-posts'>
  <div id='container-btn-input'>
   <img id='img-input' src='img/profile.png' alt='profile'>
  <button type='button' id='btn-input-modal'>Cuentanos tu experiencia Laboratorians</button>
  </div>
   <div id='modal-background-post'>
    <div id='modal-content-post'>
    <div id='space-line'>
    <p>Crear Publicación</p>
    <img src='img/exit.png' class='btn-exit'>
    </div>
    <div id='line'></div>
    <div id='after-line'>
    <div id='container-img-text'>
    <img id='img-modal-post' src='img/profile.png' alt='profile'>
    <div id='container-text'></div>
    </div>
    <textarea type='text' id='input-post' placeholder='Cuentanos tu experiencia laboratorians'></textarea>
      <button disabled type='button' id='btn-post' class='btn-post-inactive'>PUBLICAR</button>
    </div>
   </div>
  </div>
  </div>
  <div id='div-post'></div>
  <div id='container-modal-delete'></div>
</main>
<footer id='footers'>©️ 2021 desarrollado por Diana, Gabriela y Lorena
</footer>
`;
  let currentPostId = ''; // Variable que tomara el valor de del id del post en evento eliminar y aceptar
  let editStatus = false; // Variable (bandera) que cambiara estado en evento editar
  let id = ''; // Variable que traera el post con su respectivo id en el evento editar
  divHome.innerHTML = viewHome;
  const btnInputModal = divHome.querySelector('#btn-input-modal');
  btnInputModal.addEventListener('click', () => { // evento que mostrara la modal para publicar
    document.querySelector('#modal-background-post').style.display = 'flex';
    document.querySelector('#modal-content-post').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.querySelector('#input-post').focus();
    document.querySelector('#input-post').value = '';
  });

  const inputPost = divHome.querySelector('#input-post');
  inputPost.addEventListener('keyup', () => { // evento del textarea
    const valueInput = inputPost.value.trim();
    // trim() metodo que no permite activar boton con espacio
    if (valueInput === '') {
      document.querySelector('#btn-post').disabled = true; // boton publicar inactivo
    } else {
      document.querySelector('#btn-post').disabled = false; // boton publicar activo
    }
  });

  const btnPost = divHome.querySelector('#btn-post'); // boton publicar
  btnPost.addEventListener('click', async () => {
    const describe = document.querySelector('#input-post').value; // describe como valor del input
    const nameuid = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    document.body.style.overflow = 'visible';
    if (describe !== '') { // validacion de input vacio
      document.querySelector('#input-post').value = '';
      if (!editStatus) {
        await post(describe, nameuid, uid);
      } else {
        await updatePost(id, {
          description: describe, // describe como valor del input y como valor del objeto
          nameUser: nameuid,
          uidUser: uid,
          currentDate: new Date(),
        });
      }
      editStatus = false;
      document.querySelector('#btn-post').innerText = 'PUBLICAR';
      document.querySelector('#modal-background-post').style.display = 'none';
      document.querySelector('#modal-content-post').style.display = 'none';
    }
    document.querySelector('#btn-post').disabled = true;
  });
  getPosts().onSnapshot((response) => {
    const nameuid = firebase.auth().currentUser.displayName;
    const divContainerText = document.querySelector('#container-text');
    divContainerText.innerHTML = '';// Template que imprime nombre de usuario en modal publicar
    divContainerText.innerHTML += `
    <p>${nameuid}</p>
    `;
    const uid = firebase.auth().currentUser.uid;
    const divPosts = document.querySelector('#div-post');
    divPosts.innerHTML = '';
    response.forEach((doc) => {
      const getdate = new Date(doc.data().currentDate.seconds * 1000);
      const date = `${getdate.getDate()}/${(getdate.getMonth() + 1)}/${getdate.getFullYear()}`;
      divPosts.innerHTML += `
 <div class= 'card-post'>
    <div id='container-user-data'>
     <img id='img-post' src='img/profile.png' alt='profile'>
      <div id='container-data'>
        <p id='user-name'>${doc.data().nameUser}</p>
        <p id='date'>${date}</p>
      </div>
    </div>
         <p id='description-post'>${doc.data().description}</p>
       <div id='container-likes'>
          ${doc.data().likes.includes(uid) ? `
         <img src='img/like.png' class='img-like' data-id='${doc.id}'><span>${doc.data().likes.length}</span></` : ` <img src='img/dislike.png' class='img-like' data-id='${doc.id}'><span>${doc.data().likes.length}</span>`} 
       </div>
             ${uid === doc.data().uidUser ? `
           <div id='container-selects'>
              <img src='img/edit.png' class='img-edit' data-id='${doc.id}'>
              <img src='img/delete.png' class='img-delete' data-id='${doc.id}'>
            </div>
             ` : ''}
   </div>`;

      const ContainerModalDelete = document.querySelector('#container-modal-delete');
      // Template de modal para confirmar eliminacion de post
      ContainerModalDelete.innerHTML = `
  <div id='modal-content-delete'>
  <div id='container-img-exit'>
    <img src='img/exit.png' class='btn-exit'>
    </div>
    <div id='content-modal-delete'>
    <p>¿Desear eliminar tu post?</p>
    <button type='button' id='btn-accept-delete'>ACEPTAR</button>
    </div>
  </div>`;
      // Evento que abrira modal para confirmar eliminacion del post
      const btnDelete = document.querySelectorAll('.img-delete');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          document.querySelector('#container-modal-delete').style.display = 'flex';
          document.querySelector('#modal-content-delete').style.display = 'block';
          document.body.style.overflow = 'hidden';
          currentPostId = e.target.dataset.id;
        });
      });
      // Evento que confirma la eliminacion del post
      const btnAccept = document.querySelectorAll('#btn-accept-delete');
      btnAccept.forEach((btn) => {
        btn.addEventListener('click', async () => {
          await deletePost(currentPostId);
          document.querySelector('#container-modal-delete').style.display = 'none';
          document.body.style.overflow = 'visible';
        });
      });
      // Evento para editar un post
      const btnEdit = document.querySelectorAll('.img-edit');
      btnEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const editDoc = await getPost(e.target.dataset.id);
          editStatus = true;
          id = editDoc.id;
          document.querySelector('#input-post').value = editDoc.data().description;
          document.querySelector('#btn-post').innerText = 'GUARDAR';
          document.querySelector('#modal-background-post').style.display = 'flex';
          document.querySelector('#modal-content-post').style.display = 'block';
        });
      });
      // Evento para cerra modales
      const btnExit = document.querySelectorAll('.btn-exit');
      btnExit.forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelector('#btn-post').innerText = 'PUBLICAR';
          document.querySelector('#modal-background-post').style.display = 'none';
          document.querySelector('#modal-content-post').style.display = 'none';
          document.querySelector('#container-modal-delete').style.display = 'none';
          document.querySelector('#modal-content-delete').style.display = 'none';
          document.body.style.overflow = 'visible';
        });
      });
      // Evento para like y dislike
      const btnLike = document.querySelectorAll('.img-like');
      btnLike.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const likeDoc = await getPost(e.target.dataset.id);
          const likeUser = likeDoc.data().likes;
          if (likeUser.includes(uid)) { // Valida si uid esta agregado en likeuser (objeto)
            dislike(uid, e.target.dataset.id);
          } else {
            like(uid, e.target.dataset.id);
          }
        });
      });
    });
  });
  return divHome;
};
