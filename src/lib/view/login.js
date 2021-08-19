export const login = () => {
    const viewLogin = `
    <form id="formLogin"> 
      <input type="email" id="email">
      <br>
      <br>
      <input type="password" id="password">
      <br>
      <br>
      <a href="#/">iniciar Sesion</a>
      <button type="submit" id="btnRegister"> Iniciar Sesión</button>
      
  </form>
  <p>Si no tienes cuenta <a href="#/register">Registrate</a></p>
  `
    return viewLogin;
}