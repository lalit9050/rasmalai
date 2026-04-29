// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
authDomain: "rasmalai-food-delivery.firebaseapp.com",
projectId: "rasmalai-food-delivery",
storageBucket: "rasmalai-food-delivery.firebasestorage.app",
messagingSenderId: "892442042911",
appId: "1:892442042911:web:d5b499feb4e9770a716b2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}