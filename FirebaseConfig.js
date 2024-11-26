import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyBs_IU1tTk7DrCsDlNEPFddnhMh1vYnMPc",
    authDomain: "jinx-4e26a.firebaseapp.com",
    projectId: "jinx-4e26a",
    storageBucket: "jinx-4e26a.firebasestorage.app",
    messagingSenderId: "782159029371",
    appId: "1:782159029371:web:fe3e25c494aec15389eede",
    measurementId: "G-WS4F1HNKW9"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);