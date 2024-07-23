import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyChYrxH4wOc9o_X53KMM7C5irgbZj1ky2c",
  authDomain: "comesandgoes-5b3f4.firebaseapp.com",
  projectId: "comesandgoes-5b3f4",
  storageBucket: "comesandgoes-5b3f4.appspot.com",
  messagingSenderId: "856956471404",
  appId: "1:856956471404:web:c5da867aebd3212b44b049"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export default app;
