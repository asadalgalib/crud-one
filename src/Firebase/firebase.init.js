import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEkHRdfRmLmQPdcl20xXeGVJ1co3h--qk",
  authDomain: "coffe-house-c0065.firebaseapp.com",
  projectId: "coffe-house-c0065",
  storageBucket: "coffe-house-c0065.firebasestorage.app",
  messagingSenderId: "428642939409",
  appId: "1:428642939409:web:f8116a230270e36761b7b0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);