import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDY_uJoEih-2k_9duwav_gNSkAp6-X_M28",
  authDomain: "bullabank-cfad2.firebaseapp.com",
  projectId: "bullabank-cfad2",
  storageBucket: "bullabank-cfad2.firebasestorage.app",
  messagingSenderId: "362407162740",
  appId: "1:362407162740:web:02fa86509c8f6b79b23221",
  measurementId: "G-887DSBC7KR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
