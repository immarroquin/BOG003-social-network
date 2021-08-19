export const login = (hash) => {
  const divLogin = document.createElement('div');  
    const viewLogin = `
    <form id="formLogin"> 
      <input type="email" id="email">
      <br>
      <br>
      <input type="password" id="password">
      <br>
      <br>
      <a href="#/home">iniciar Sesion</a>
      
  </form>
  <p>Si no tienes cuenta <a href="#/register">Registrate</a></p>
  `
  divLogin.innerHTML= viewLogin;
    return divLogin;
}