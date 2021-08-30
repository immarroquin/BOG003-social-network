import {
  authEmailAndPassword,
  signIn,
  signOut,
  authLogin,
  loginGoogle,
} from '../src/lib/index.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mocksdk = new firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);
global.firebase = mocksdk;
mocksdk.auth().autoFlush();

describe('authEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof authEmailAndPassword).toBe('function');
  });
  it('Registrarse con correo y contraseña', () => {
    authEmailAndPassword('laboratorians@hotmail.com', '123456').then((user) => {
      expect(user.email).toBe('laboratorians@hotmail.com');
    });
  });
});
describe('signIn', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });
  it('deberia poder iniciar sesion con correo y contraseña', async () => {
    await signIn('laboratorians@hotmail.com', '123456');
    console.log(window.location);
    expect(window.location.href).toBe('#/home');
  });
});
describe('signOut', () => {
  it('debería ser una función', () => {
    expect(typeof signOut).toBe('function');
  });
  it('deberia poder cerrar sesion', async () => {
    await signOut().then((user) => {
      expect(user).toBe(undefined);
    });
  });
});
describe('authLogin', () => {
  it('debería ser una función', () => {
    expect(typeof authLogin).toBe('function');
  });
});
describe('loginGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
});
