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
  divHome.setAttribute('id','div-home');
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
      <input type='text' id='input-post' placeholder='Cuentanos tu experiencia laboratorians'>
      <button disabled type='button' id='btn-post'>PUBLICAR</button>
    </div>
  </div>
  <div id='div-post'></div>
  <button type='button' id='btn-signout'>Cerrar Sesion</button>
</main>
`;
  let openSelect = false;
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
         <div class='container-options'>
             ${uid === doc.data().uidUser ? `
               <img src='img/select.png' id='btn-select' data-id='${doc.id}'>
           <div id='container-selects'>
              <button type='button' class='btn-edit' data-id='${doc.id}'>
              <img src='img/edit.png' class='img-selects'>Editar</button>
              <button type='button' class='btn-delete'>
              <img src='img/delete.png' class='img-selects'>Eliminar</button> 
              <div class='container-modal-delete'>
                 <div class='modal-content-delete'>
                   <img src='img/exit.png' class='btn-exit'>
                   <p>¿Deseas eliminar este post?</p>
                   <button class='btn-accept-delete' data-id='${doc.id}'>ACEPTAR</button>
                 </div>
              </div>
            </div>` : ''}  
          </div>        
  </div>`;

      const btnSelect = document.querySelectorAll('#btn-select');
      btnSelect.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (openSelect === false) {
            document.querySelector('#container-selects').style.display = 'block'; 
            openSelect = true;           
          }else{
            document.querySelector('#container-selects').style.display = 'none';
            openSelect = false;
          }
        });
      });


      const btnDelete = document.querySelectorAll('.btn-delete'); 
      btnDelete.forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelector('.container-modal-delete').style.display = 'block';
          document.querySelector('.modal-content-delete').style.display = 'block';
        });
      });
    
      /*const divContainerPost = document.querySelectorAll('.card-post');
      divContainerPost.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log(openSelect);
      if (openSelect === true) {
        document.querySelector('#container-selects').style.display = 'none';
            openSelect = false;
      }
       }); 
    });*/
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

      const btnAccept = document.querySelectorAll('.btn-accept-delete');
      btnAccept.forEach(btn => {
        btn.addEventListener('click', (e) => {
           deletePost(e.target.dataset.id);
        });
      });

      const btnExit = document.querySelectorAll('.btn-exit');
      btnExit.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.container-modal-delete').style.display = 'none';
        document.querySelector('.modal-content-delete').style.display = 'none';
      });
    }); 
      const btnLike = document.querySelectorAll('.img-like');
      btnLike.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const likeDoc = await getPost(e.target.dataset.id);
          const likeUser = likeDoc.data().likes;
          console.log(likeUser);
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