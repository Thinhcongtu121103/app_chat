import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUlxvnITHKjRlYlPmOiRje2RT8CpmaF6o",
    authDomain: "app-chat-21b87.firebaseapp.com",
    projectId: "app-chat-21b87",
    storageBucket: "app-chat-21b87.appspot.com",
    messagingSenderId: "701811147279",
    appId: "1:701811147279:web:2e2ba0b941d7eb6fa2197a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };