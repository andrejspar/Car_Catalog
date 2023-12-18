// Firebase.jsx - Firebase configuration and functions for interacting with Realtime Database
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, push, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5kVPaWRPMHRLNdrjc7G5Rh1ZX9Rx5mxc",
  authDomain: "car-data-98150.firebaseapp.com",
  databaseURL:
    "https://car-data-98150-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "car-data-98150",
  storageBucket: "car-data-98150.appspot.com",
  messagingSenderId: "1087521005335",
  appId: "1:1087521005335:web:f036f2fb03f1f10cdf2152",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const db = {
  ref: (path) => ref(database, path),
  set,
  remove,
  push,
};

// Function to add cars to the Realtime Database
export const initializeCars = () => {
  const carsRef = db.ref("cars");
  set(carsRef);
};

// Function to fetch data from the Realtime Database
export const getData = async (path) => {
  const dataRef = db.ref(path);
  const snapshot = await get(dataRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.error("Data not found");
    return null;
  }
};
