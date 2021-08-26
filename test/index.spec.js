import {
  authEmailAndPassword,
  signIn,
  authLogin,
  signOut,
  loginGoogle,
} from '../src/lib/index.js';

describe('authEmailAndPassword', () => {
  it('debería ser una función', () => {
    expect(typeof authEmailAndPassword).toBe('function');
  });
});
describe('signIn', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });
});
describe('signOut', () => {
  it('debería ser una función', () => {
    expect(typeof signOut).toBe('function');
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
