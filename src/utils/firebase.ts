import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db };
