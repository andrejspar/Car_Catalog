// Card.jsx - Component for rendering a card with car information
import React from "react";
import "./Card.css";

// Card component that takes a 'car' object as a prop
const Card = ({ car }) => {
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
        </div>
      </div>
    </div>
  );
};

export default Card;
