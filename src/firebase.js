// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REDIREACT_API_KEY,
    authDomain: "app-chat-21b87.firebaseapp.com",
    projectId: "app-chat-21b87",
    storageBucket: "app-chat-21b87.appspot.com",
    messagingSenderId: "701811147279",
    appId: "1:701811147279:web:2e2ba0b941d7eb6fa2197a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
