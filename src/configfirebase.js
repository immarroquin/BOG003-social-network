const firebaseConfig = {

  apiKey: 'AIzaSyCcgXYoDi5fSgG4a_VwXd6I50UseN1hJ2w',
  authDomain: 'laboratorians-sn4.firebaseapp.com',
  projectId: 'laboratorians-sn4',
  storageBucket: 'laboratorians-sn4.appspot.com',
  messagingSenderId: '315379567807',
  appId: '1:315379567807:web:c89571f783919618b20a0a',
  measurementId: 'G-EV6FZXJJF2',
};
export const defaultApp = firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.firestore();
