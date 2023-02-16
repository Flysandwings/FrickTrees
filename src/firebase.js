import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAetL7GJNnVRz_FVyxakGBOBVCkxs1sZms",
  authDomain: "pdgajr.firebaseapp.com",
  projectId: "pdgajr",
  storageBucket: "pdgajr.appspot.com",
  messagingSenderId: "312194055374",
  appId: "1:312194055374:web:5780b1cb470ffaab29249f",
  databaseURL: "https://pdgajr-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
