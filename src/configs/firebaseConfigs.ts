import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_KEY,
  authDomain: "home-chef-dcd47.firebaseapp.com",
  projectId: "home-chef-dcd47",
  storageBucket: "home-chef-dcd47.appspot.com",
  messagingSenderId: "132887916873",
  appId: "1:132887916873:web:cd8e18f446445497ecaa98",
  measurementId: "G-GB1DR07G56",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
