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
      <a href="#/register">Registrate</a>
  </form>
  <h1>Si no tienes cuenta <a href="#/register"></a></h1>
  `
    return viewLogin;
}