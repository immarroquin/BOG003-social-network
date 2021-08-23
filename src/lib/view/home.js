export const home = () => {
    const divHome = document.createElement('div');
    //const user = firebase.auth().currentUser;
    //const displayName = user.displayName;
  //  const email = user.email;
    console.log(displayName, "Hola usuario");
    const viewHome = `
    <h1>Bienvenidos a Laboratorians</h1>
    `
    divHome.innerHTML= viewHome;
    return divHome;
}
