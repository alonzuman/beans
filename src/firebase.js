import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAdXNLwtzI_IhxVVKCJpTgMn4Bzpw-0_r0",
  authDomain: "beans-b202f.firebaseapp.com",
  projectId: "beans-b202f",
  storageBucket: "beans-b202f.appspot.com",
  messagingSenderId: "1086830117656",
  appId: "1:1086830117656:web:5c270594f4e5ee941ad46d",
  measurementId: "G-43LJP4NENS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
