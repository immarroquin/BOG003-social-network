
export const authEmailAndPassword = (email, password) =>{
 const formRegister = document.querySelector('#formRegister');

 formRegister.addEventListener('submit', (e) => {
   e.preventDefault();

   firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((userCredential) => {
       // Signed in
       formRegister.reset();
       alert("Tu correo se registro con exito");
       const user = userCredential.user;
       // ...
     })
    .catch((error) => {
      formRegister.reset();
       const errorCode = error.code;
       const errorMessage = error.message;
       alert('Tu correo ya esta registrado');
       // ..
     })



   // [START auth_send_email_verification]
   firebase.auth().currentUser.sendEmailVerification()
     .then(() => {
       // Email verification sent!
       // ...
     });
   // [END auth_send_email_verification

 });

 return formRegister
};


