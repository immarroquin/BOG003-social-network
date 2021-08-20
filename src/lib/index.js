export const authEmailAndPassword = (email, password) => {
  const formRegister = document.querySelector('#formRegister');

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Tu correo se registro con exito");
        const user = userCredential.user;
        location.reload();
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage , 'Tu correo ya esta registrado');
        location.reload();
        // ..
      })
   
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        // ...
      });
    // [END auth_send_email_verification
  });
  return formRegister
};


    