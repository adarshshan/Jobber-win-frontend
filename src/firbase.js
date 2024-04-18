
import { initializeApp } from "firebase/app";

console.log(process.env.FIREBASE_API_KEY);
console.log('this is your env data')

const firebaseConfig = {
    apiKey: "AIzaSyAM5c12jhgsSf9GtEER4oRuAStd63P0THU",
    authDomain: "jobberwin-92f50.firebaseapp.com",
    projectId: "jobberwin-92f50",
    storageBucket: "jobberwin-92f50.appspot.com",
    messagingSenderId: "592502623475",
    appId: "1:592502623475:web:6ece47f36cfe0e03f0bb86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;