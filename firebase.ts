import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase para OICE.
// Se recomienda crear un archivo `.env` en la raíz del proyecto con las credenciales correspondientes.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopmentPurposesOnly",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "oice-observatorio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "oice-observatorio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "oice-observatorio.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
