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
  divHome.setAttribute('id', 'div-home'); 
  const viewHome = `
</html>

<header id='hder'>
<img id='logo-hder' src='img/logolaborafdonegro.png' alt='logo'>
<div class='container-images'>
<img id='img-home' src='img/Home.png' alt='home'>
<img id='img-profile' src='img/profile.png' alt='profile'>
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
  <button type='button' id='btn-signout'>Cerrar Sesion</button>
</main>
`;
  let editStatus = false;
  let id = '';
  divHome.innerHTML = viewHome;
  const btnInputModal = divHome.querySelector('#btn-input-modal');
  btnInputModal.addEventListener('click', () => {
    document.querySelector('#modal-background-post').style.display = 'flex';
    document.querySelector('#modal-content-post').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.querySelector('#input-post').focus();
    document.querySelector('#input-post').value='';
  });

  const inputPost = divHome.querySelector('#input-post');
  inputPost.addEventListener('keyup', () => {
    const valueInput = inputPost.value.trim();
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
    const date = getdate.getDate() + '/' + (getdate.getMonth() + 1) + '/' + getdate.getFullYear();
    document.body.style.overflow = 'visible';
    if (describe !== '') {
      document.querySelector('#input-post').value = '';
    
      if (!editStatus) {
        await post(describe, nameuid, uid, date);
      } else {
        await updatePost(id, {
          description: describe,
          nameUser: nameuid,
          uidUser: uid,
          currentDate: date,
        })
      }
      editStatus = false;
      document.querySelector('#btn-post').innerText = 'PUBLICAR';
      document.querySelector('#modal-background-post').style.display = 'none';
      document.querySelector('#modal-content-post').style.display = 'none';
    }
    
  });
  

  getPosts().onSnapshot((response) => { 
const nameuid = firebase.auth().currentUser.displayName;
  const divContainerText = document.querySelector('#container-text');
  divContainerText.innerHTML = '';
  divContainerText.innerHTML += ` 
<p>${nameuid}</p>
`; 
const uid = firebase.auth().currentUser.uid;
    const divPosts = document.querySelector('#div-post');
    divPosts.innerHTML = '';
    response.forEach((doc) => {
      divPosts.innerHTML += `
 <div class= 'card-post'>
    <div id='container-user-data'>
     <img id='img-post' src='img/profile.png' alt='profile'>
      <div id='container-data'>
        <p id='user-name'>${doc.data().nameUser}</p>
        <p id='date'>${doc.data().currentDate}</p>
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
   ContainerModalDelete.innerHTML += ` 
  <div id='modal-background-delete'>
    <div id='modal-content-delete'> 
      <img src='img/exit.png' class='btn-exit'>
      <p>¿Desear eliminar tu post?</p>
      <button type='button' id='btn-accept-delete'>ACEPTAR</button>
    </div>   
  </div>`;

       const btnDelete = document.querySelectorAll('.img-delete');
      btnDelete.forEach(btn => {
        btn.addEventListener('click', async (e) => {
        //  console.log('id del pos ELIMINADO ' + e.target.dataset.id);
      const menssageDelete = confirm('¿Deseas eliminar el post?');
      if (menssageDelete) {
        deletePost(e.target.dataset.id);
      }else {
        alert('error');
      }
        });
      });

      /*const btnAccept = document.querySelectorAll('#btn-accept-delete');
      btnAccept.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        
        //ContainerModalDelete.innerHTML = '';            
         //document.body.style.overflow = 'visible';
      });
    });*/
      
      
      const btnEdit = document.querySelectorAll('.img-edit');
      btnEdit.forEach(btn => {
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


      const btnExit = document.querySelectorAll('.btn-exit');
      btnExit.forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelector('#modal-background-post').style.display = 'none';
          document.querySelector('#modal-content-post').style.display = 'none';
          document.body.style.overflow = 'visible';
        });
      });
      const btnLike = document.querySelectorAll('.img-like');
      btnLike.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const likeDoc = await getPost(e.target.dataset.id);
          const likeUser = likeDoc.data().likes;
          if (likeUser.includes(uid)) {
            dislike(uid, e.target.dataset.id);
          } else {
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