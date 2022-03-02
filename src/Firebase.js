// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8vCifY1an-vKQhZFVLRfDvUTt_AUTeMw",
  authDomain: "reels-insta-65238.firebaseapp.com",
  projectId: "reels-insta-65238",
  storageBucket: "reels-insta-65238.appspot.com",
  messagingSenderId: "423051187987",
  appId: "1:423051187987:web:2ec16074fc1fab4c4b6ce6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//exporting AUTHENTICATION of users
export const auth= firebase.auth();

//exporting database
const firestore = firebase.firestore();
export  const database =  {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

//exporting storage
export const storage = firebase.storage()