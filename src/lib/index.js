
export const authEmailAndPassword = (email, password, names) =>{
 const formRegister = document.querySelector('#formRegister');

 formRegister.addEventListener('submit', (e) => {
   e.preventDefault();

   firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((userCredential) => {
       // Signed in
       userCredential.user.updateProfile({
         displayName : names
       })
       const user = userCredential.user;
       alert("Tu correo se registro con exito");
       location.reload()
       // ...
     })
    .catch((error) => {
      
        const divErroMessage = document.createElement('div');
        divErroMessage.setAttribute('id', 'div-error-message');
        const errorCode = error.code;
       const errorMessage = error.message;
       alert('Tu correo ya esta registrado');
       location.reload()
       // ..
     })

     const configurationUrlEmail = {
      url : 'http://localhost:5000'
    }


   // [START auth_send_email_verification]
   firebase.auth().currentUser.sendEmailVerification(configurationUrlEmail)
     .then(() => {
       // Email verification sent!
       // ...
     });
   // [END auth_send_email_verification

 });

 return formRegister
};


