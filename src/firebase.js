import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  *** REDACTED ***
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
