// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyni4gRUzo9qoORheuCb96tcf2G9Ftkzc",
    authDomain: "app-chat-7b455.firebaseapp.com",
    projectId: "app-chat-7b455",
    storageBucket: "app-chat-7b455.appspot.com",
    messagingSenderId: "767058224004",
    appId: "1:767058224004:web:b047ea72fa1c8b3908b3d1"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };