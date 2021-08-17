// aqui exportaras las funciones que necesites

export const register = () => {
  const email = 'test@example.com';
  const password = 'hunter2';
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
