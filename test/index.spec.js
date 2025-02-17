import {
  authEmailAndPassword,
  signIn,
  signOut,
  authLogin,
  loginGoogle,
  post,
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
  it('deberia poder iniciar sesion con correo y contraseña', () => {
    signIn('laboratorians@hotmail.com', '123456')
      .then((user) => {
        expect(user).toBe('Te registraste con exito');
      });
  });
});
describe('signOut', () => {
  it('debería ser una función', () => {
    expect(typeof signOut).toBe('function');
  });
  it('deberia poder cerrar sesion', () => {
    signOut().then((response) => {
      expect(response).toBe('');
    });
  });
});
describe('authLogin', () => {
  it('debería ser una función', () => {
    expect(typeof authLogin).toBe('function');
  });
  it('deberia verificar usuario ya registrado y direccionarlo a una nueva ruta', () => {
    authLogin('laboratorians@hotmail.com', '123456');
    firebase.auth().onAuthStateChanged((user) => {
      expect(user).toBe('#/home');
    });
  });
});
describe('loginGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('debería tomar las credenciales de google y direccionar al usuario a una nueva ruta', () => {
    loginGoogle('laboratorians@hotmail.com');
    firebase.auth().signInWithPopup('laboratorians@gmail.com').then((response) => {
      expect(response).toBe('#/home');
    });
  });
});

const { mockFirebase } = require('firestore-jest-mock');

mockFirebase({
  database: {
    posts: [{
      description: 'Hola Laboratorians', nameUser: 'Lorena Marroquin', uidUser: 'HnIJfvtFvFcXDLxLMhOGNqQ7myk2', currentDate: '14/9/2021', likes: '',
    },
    {
      description: 'Estoy muy feliz', nameUser: 'Gabriela Paez', uidUser: 'dM6cypkuaRfde3EXmRRuPCh6o7i1', currentDate: '13/9/2021', likes: '',
    }],
  },
});

// const { mockCollection } = require('firestore-jest-mock/mocks/firestore');

describe('post', () => {
  const db = firebase.firestore();
  it('debería ser una función', () => {
    expect(typeof post).toBe('function');
  });
  it('Debería obtener los posts', () => {
    db.collection('posts')
      .get()
      .then((userDocs) => {
        expect(post()).toHaveBeenCalledWith('post');
        expect(userDocs.doc.data().nameUser).toEqual();
      });
  });
});
