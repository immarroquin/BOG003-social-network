export const authEmailAndPassword = (email, password, names) => {
  const formRegister = document.querySelector('#formRegister');
  //Función auth para registrar el usuario con email, password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userCredential.user.updateProfile({
        displayName: names
      }).then(() => {
        const configurationUrlEmail = {
          url: 'http://localhost:5000'
        }
        firebase.auth().currentUser.sendEmailVerification(configurationUrlEmail)
      })
      alert("Tu correo se registro con exito");
      const user = userCredential.user;
      formRegister.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = document.querySelector('#errorMessageRegister');
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage.innerHTML = 'El correo debe ser válido';
          break;
        case 'auth/weak-password':
          errorMessage.innerHTML = 'La contraseña debe contener al menos seis caracteres';
          break;
        case 'auth/email-already-in-use':
          errorMessage.innerHTML = 'Tu correo ya esta registrado, inicia sesión';
          break;
        default:
          errorMessage.innerHTML = 'Ups algo falló';
          break;
      }
    })
  // [END auth_send_email_verification
  // });

  return formRegister
};
export const signIn = (email, password) =>{
  const formLogin = document.querySelector('#formLogin');
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Bienvenidoooo");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = document.querySelector('#errorMessageLogin');
    switch (errorCode) {
      case 'auth/invalid-email':
        errorMessage.innerHTML = 'El correo debe ser válido';
        break;
      //  case 'auth/wrong-password':
      //   errorMessage.innerHTML = 'La contraseña debe contener al menos seis caracteres';
      //   break;
        case 'auth/invalid-password':
        errorMessage.innerHTML = 'Contraseña incorrecta';
        break;
        case 'auth/user-not-found':
          errorMessage.innerHTML= 'El correo no se encuentra registrado';
      default:
        errorMessage.innerHTML = 'Ups algo falló';
        break;
    }
    return formLogin
  });
}

// export const validNameRegister = (namesd) => {
//   const userName = firebase.auth().currentUser;
//   if (userName !== null){
//     const dataName = namesd.displayName;
//     console.log(dataName);
//   }
//   return dataName;
// }

// firebase.auth().currentUser.updateProfile({
  //   displayName: document.querySelector("#name").value
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = document.querySelector('#divErrorMessage');
  //       switch (errorCode) {
  //         case 'auth/invalid-display-name':
  //           errorMessage.innerHTML = 'El nombre debe contener letras';
  //           console.log(errorMessage, "name error");
  //           break;
  //         default:
  //           errorMessage.innerHTML = 'Ups algo falló';
  //           break;
  //       }
  //     })
  // })


        // case 'auth/invalid-password':
        //   errorMessage.innerHTML = 'La contraseña debe contener al menos seis caracteres';
        //   break;
        // case 'auth/invalid-display-name':
        //   errorMessage.innerHTML = 'El nombre debe contener letras';
        //   break;