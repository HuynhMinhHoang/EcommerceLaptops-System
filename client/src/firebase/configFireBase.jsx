import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCe1NyIuPo_8d-YJJ9MDKLBWaJWc-zQs5Q",
  authDomain: "chat-app-2d1a2.firebaseapp.com",
  projectId: "chat-app-2d1a2",
  storageBucket: "chat-app-2d1a2.appspot.com",
  messagingSenderId: "363566779933",
  appId: "1:363566779933:web:963a68e1e0189496c600f4",
  measurementId: "G-6TNVKL50Z9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

const database = getDatabase(app);

export { auth, db, GoogleAuthProvider, ref, push, onValue, database };
