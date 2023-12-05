// App.jsx - Main component for the Car Catalog application

// Import necessary React components and hooks
import React, { useEffect, useState } from "react";
import "./App.css"; // Import styles for the App component
import Card from "./components/Card"; // Import the Card component
import { db } from "./components/Firebase"; // Import the Firebase database object and configuration
import { get } from "firebase/database"; // Import the 'get' function for fetching data from the database

// App component definition
function App() {
  // State to store the fetched car data
  const [cars, setCars] = useState([]);

  // useEffect hook to fetch data from the database when the component mounts
  useEffect(() => {
    // Function to fetch data from the 'cars' node in the database
    const fetchData = async () => {
      try {
        const carsRef = db.ref("cars"); // Reference to the 'cars' node in the database
        const snapshot = await get(carsRef); // Use 'get' function instead of 'once' for data fetching

        // Process the snapshot and extract car data
        const carsData = [];
        snapshot.forEach((childSnapshot) => {
          carsData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        // Update the state with the fetched car data
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching data:", error); // Log an error if data fetching fails
      }
    };

    // Invoke the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once, equivalent to componentDidMount

  // Render the main application content
  return (
    <div>
      <h1>Car Catalog</h1>
      {/* Render the list of cars using the Card component */}
      <div className="card-container">
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default App;
