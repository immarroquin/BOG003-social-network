// eslint-disable-next-line
import { defaultApp } from "../configfirebase.js";

export const authEmailAndPassword = (email, password, names) => { //authEmailAndPassword es la funcion que contiene los 3 parametro para registrarse
  const formRegister = document.querySelector('#formRegister');
  firebase.auth().createUserWithEmailAndPassword(email, password)
   //usamos el metodo createUserWithEmailAndPassword de firebase para crear usuario con email y password
    .then((userCredential) => {
      userCredential.user.updateProfile({ //Metodo updateProfile para obtener el nombre registrado
        displayName: names
      }).then(() => {
        const configurationUrlEmail = {
          url: 'http://localhost:5000'
        }
        firebase.auth().currentUser.sendEmailVerification(configurationUrlEmail) //Metodo sendEmailVerification para enviar correo de verificación al registrarse
      })
     alert('Cuenta creada verifica tu correo');
      const user = userCredential.user;
      formRegister.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = document.querySelector('#errorMessageRegister');
      //Creamos casos de error para registro de usuario nuevo
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage.innerHTML = '⚠️ El correo debe ser válido';
          break;
        case 'auth/weak-password':
          errorMessage.innerHTML = ' ⚠️ La contraseña debe contener mínimo seis caracteres';
          break;
        case 'auth/email-already-in-use':
          errorMessage.innerHTML = '⚠️ Tu correo ya esta registrado, inicia sesión';
          break;
        default:
          errorMessage.innerHTML = '⚠️ Ups algo falló';
          break;
      }
      /*firebase.auth().currentUser;
      const inputName = document.querySelector("#name").value
      if (userName !== null){  
        const displayName = user.displayName;
      } else {
        alert('Nombre invalido');
      }*/
    })

    

  return formRegister
};

export const signIn = (email, password) =>{ // signIn es la funcion para iniciar sesion con email y password
  const formLogin = document.querySelector('#formLogin');
  firebase.auth().signInWithEmailAndPassword(email, password) // Usamos el metodo signInWithEmailAndPassword autenticar a usuario registrado 
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Bienvenidoooo");
    formLogin.reset(); //metodo reset() para limpiar formulario
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = document.querySelector('#errorMessageLogin');
    //Creamos casos de error para inicio de sesion de usuario ya registrado
    switch (errorCode) {
      case 'auth/invalid-email':
        errorMessage.innerHTML = 'El correo debe ser válido';
        break;
       case 'auth/wrong-password':
        errorMessage.innerHTML = 'Contraseña incorrecta';
        break;
        case 'auth/user-not-found':
          errorMessage.innerHTML = 'El correo no se encuentra registrado';
          break;
      default:
       errorMessage.innerHTML = 'Ups algo falló';
        break;
    }
     
    return formLogin
  });
}


export const authLogin = () =>{ //authLogin es la funcion para verificar usuario ya registrado y direccionarlo a nueva ruta
const userLogin = firebase.auth().onAuthStateChanged((user) => {//Usamos el metodo onAuthStateChanged para verificar el estado de autenticacion y dar permiso de acceder a la siguiente ruta
  if (user) { 
    let uid = user.uid;
    window.location.href="#/home"; // en caso de que se cumpla user se direccion la ruta home
    console.log(uid);
  } 
})
return userLogin
}


export const signOut = () =>{ 

  const logOut = firebase.auth().signOut()
  .then(() => {
    window.location.href="";
  })

  return logOut
 }


export const loginGoogle = () => {
  // [START auth_google_provider_create]
  const provider = new firebase.auth.GoogleAuthProvider();
  // [START auth_google_signin_popup]
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      window.location.href="#/home";
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  // [END auth_google_signin_popup]
  
  }
















 /*export const validNameRegister = (names) => {
   const userName = firebase.auth().currentUser;
   if (userName !== null){
     const dataName = namesd.displayName;
     console.log(dataName);
   }
   return dataName;
 }

 firebase.auth().currentUser.updateProfile({
    displayName: document.querySelector("#name").value
      .catch((error) => {
       const errorCode = error.code;
        const errorMessage = document.querySelector('#divErrorMessage');
        switch (errorCode) {
         case 'auth/invalid-display-name':
          errorMessage.innerHTML = 'El nombre debe contener letras';
             console.log(errorMessage, "name error");
             break;
           default:
             errorMessage.innerHTML = 'Ups algo falló';
             break;
         }
      })
   })*/



  /* export const validNameRegister = () => {

    const userName = firebase.auth().currentUser;
    const inputName = document.querySelector("#name").value
    if (userName !== null){  
      const displayName = user.displayName;
    } else {
      alert('Nombre invalido');
    }

  return inputName 

   }
*/