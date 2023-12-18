import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { db } from "./components/Firebase";
import { get } from "firebase/database";
import Card from "./components/Card";
import CarForm from "./components/CarForm";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsRef = db.ref("cars");
        const snapshot = await get(carsRef);

        const carsData = [];
        snapshot.forEach((childSnapshot) => {
          carsData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        setCars(carsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <h1>Car Catalog</h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/add">Add Car</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/add" element={<CarForm mode="add" />} />
          <Route path="/edit/:id" element={<CarForm mode="edit" />} />
          <Route path="/delete/:id" element={<CarForm mode="delete" />} />
          <Route
            path="/"
            element={
              <div className="card-container">
                {cars.map((car) => (
                  <Card key={car.id} car={car} />
                ))}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
