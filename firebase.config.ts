// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6dgI0XCOC98hOsyCjPupq1t1eu0Qtswc",
  authDomain: "netflix-clone-78a79.firebaseapp.com",
  projectId: "netflix-clone-78a79",
  storageBucket: "netflix-clone-78a79.appspot.com",
  messagingSenderId: "380110599054",
  appId: "1:380110599054:web:21548c5fad19a46ab22adf",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
