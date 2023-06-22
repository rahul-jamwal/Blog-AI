// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp-YiQ9h7WD8UTIfaXl0MmFkzQBHb0ZAI",
  authDomain: "blog-ai-4674e.firebaseapp.com",
  projectId: "blog-ai-4674e",
  storageBucket: "blog-ai-4674e.appspot.com",
  messagingSenderId: "499571913592",
  appId: "1:499571913592:web:e8c27c843bb4d55d5cce8d"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
