// Firebase.jsx - Firebase configuration and functions for interacting with Realtime Database

// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);
// Get the database instance
const database = getDatabase(app);

// Simplified database object for easy reference
export const db = {
  ref: (path) => ref(database, path), // Use a function for 'ref' to ensure it works as expected
  set, // Export 'set' function directly
};

// Function to add cars to the Realtime Database
export const initializeCars = () => {
  const carsRef = db.ref("cars");

  const sampleCars = [
    {
      make: "Toyota",
      model: "Camry",
      year: 2022,
      image: "https://source.unsplash.com/300x200/?toyota,camry",
    },
    {
      make: "Honda",
      model: "Accord",
      year: 2021,
      image: "https://source.unsplash.com/300x200/?honda,accord",
    },
    {
      make: "Ford",
      model: "Mustang",
      year: 2023,
      image: "https://source.unsplash.com/300x200/?ford,mustang",
    },
    {
      make: "Chevrolet",
      model: "Silverado",
      year: 2020,
      image: "https://source.unsplash.com/300x200/?chevrolet,silverado",
    },
    {
      make: "BMW",
      model: "X5",
      year: 2022,
      image: "https://source.unsplash.com/300x200/?bmw,x5",
    },
    {
      make: "Mercedes-Benz",
      model: "E-Class",
      year: 2021,
      image: "https://source.unsplash.com/300x200/?mercedes-benz,e-class",
    },
    {
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      image: "https://source.unsplash.com/300x200/?tesla,model-3",
    },
    {
      make: "Nissan",
      model: "Altima",
      year: 2020,
      image: "https://source.unsplash.com/300x200/?nissan,altima",
    },
    {
      make: "Audi",
      model: "Q5",
      year: 2022,
      image: "https://source.unsplash.com/300x200/?audi,q5",
    },
    {
      make: "Hyundai",
      model: "Sonata",
      year: 2021,
      image: "https://source.unsplash.com/300x200/?hyundai,sonata",
    },
  ];

  set(carsRef, sampleCars);
};
