// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyARQHzANGsF1PoPrvxsopWxtYJc7uZJHF0",
  authDomain: "quizapp-19.firebaseapp.com",
  projectId: "quizapp-19",
  storageBucket: "quizapp-19.appspot.com",
  messagingSenderId: "1018015256771",
  appId: "1:1018015256771:web:bf43b69b4c5bc04a785276",
};

// console.log(firebaseConfig.apiKey);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
