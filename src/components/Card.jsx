// Card.jsx - Component for rendering a card with car information
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Card.css";
import { db } from "./Firebase";

// Card component that takes a 'car' object as a prop
const Card = ({ car }) => {
  const { id, make, model, year } = car;
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const carRef = db.ref(`cars/${id}`);
      await db.remove(carRef);
      // Optionally, you can update the UI or show a notification after deletion
      console.log(`Car with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    // Container for the card components
    <div className="card-container">
      {/* Individual card with car details */}
      <div className="card">
        {/* Car image */}
        <img src={`${car.image}`} alt={`${car.make} ${car.model}`} />
        {/* Card content with car make, model, and year */}
        <div className="card-content">
          <h3>{`${car.make} ${car.model}`}</h3>
          <p>Year: {car.year}</p>
          {/* Edit button */}
          <Link to={`/edit/${id}`}>
            <button>Edit</button>
          </Link>
          {/* Delete button with onClick handler */}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
