import { post, updatePost } from "../index.js";

export const add = () => {
  const nameuid = firebase.auth().currentUser.displayName;
  const divAdd = document.createElement("div");
  const viewAdd = `
    <div id="modal-background-post">
    <div id="modal-content-post">
    <div id="space-line">
    <p>Crear Publicación</p>
    <img src="img/exit.png" class="btn-exit">
    </div>
    <div id="line"></div>
    <div id="after-line">
    <div id="container-img-text">
    <img id="img-modal-post" src="img/profile.png" alt="profile">
    <div id="container-text">
    <p>${nameuid}</p>
    </div>
    </div>
    <textarea type="text" id="input-post" placeholder="Cuentanos tu experiencia laboratorians"></textarea>
      <button disabled="" type="button" id="btn-post" class="btn-post-inactive">PUBLICAR</button>
    </div>
   </div>
  </div>`;

  let editStatus = false; // Variable (bandera) que cambiara estado en evento editar
  let id = ""; // Variable que traera el post con su respectivo id en el evento editar
  divAdd.innerHTML = viewAdd;

  divAdd.querySelector("#modal-background-post").style.display = "flex";
  divAdd.querySelector("#modal-content-post").style.display = "block";
  document.body.style.overflow = "hidden";
  divAdd.querySelector("#input-post").focus();
  divAdd.querySelector("#input-post").value = "";

  const inputPost = divAdd.querySelector("#input-post");
  inputPost.addEventListener("keyup", () => {
    // evento del textarea
    const valueInput = inputPost.value.trim();
    // trim() metodo que no permite activar boton con espacio
    if (valueInput === "") {
      document.querySelector("#btn-post").disabled = true; // boton publicar inactivo
    } else {
      document.querySelector("#btn-post").disabled = false; // boton publicar activo
    }
  });

  const btnPost = divAdd.querySelector("#btn-post"); // boton publicar
  btnPost.addEventListener("click", async () => {
    const describe = document.querySelector("#input-post").value; // describe como valor del input
    const nameuid = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    document.body.style.overflow = "visible";
    if (describe !== "") {
      // validacion de input vacio
      document.querySelector("#input-post").value = "";
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
      document.querySelector("#btn-post").innerText = "PUBLICAR";
      document.querySelector("#modal-background-post").style.display = "none";
      document.querySelector("#modal-content-post").style.display = "none";
    }
    document.querySelector("#btn-post").disabled = true;
  });

  // Evento para cerra modales
  const btnExit = divAdd.querySelectorAll(".btn-exit");
  btnExit.forEach((btn) => {
    btn.addEventListener("click", () => {
      /*document.querySelector("#btn-post").innerText = "PUBLICAR";
      document.querySelector("#modal-background-post").style.display = "none";
      document.querySelector("#modal-content-post").style.display = "none";
      document.body.style.overflow = "visible";*/
      window.location.hash = '#/home';
    });
  });

  return divAdd;
};
