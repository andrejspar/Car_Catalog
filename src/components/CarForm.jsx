import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./Firebase";
import "./CarForm.css";

const CarForm = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [mode, setMode] = useState("add"); // "add", "edit", or "delete"
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // If there's an id parameter, set the mode to "edit"
      setMode("edit");

      // Fetch the car data and populate the form
      const fetchData = async () => {
        try {
          const carRef = db.ref(`cars/${id}`);
          const snapshot = await db.get(carRef);

          if (snapshot.exists()) {
            const carData = snapshot.val();
            setMake(carData.make || "");
            setModel(carData.model || "");
            setYear(carData.year || "");
            setImage(carData.image || "");
          } else {
            console.error("Car not found");
          }
        } catch (error) {
          console.error("Error fetching car data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const carData = {
        make,
        model,
        year,
        image,
      };

      if (mode === "add") {
        // Use push to add a new car with an automatically generated key
        await db.push(db.ref("cars"), carData);
      } else if (mode === "edit") {
        const carRef = db.ref(`cars/${id}`);
        await db.set(carRef, carData);
      } else if (mode === "delete") {
        const carRef = db.ref(`cars/${id}`);
        await db.remove(carRef);
      }

      navigate("/");
    } catch (error) {
      console.error(
        `Error ${
          mode === "add" ? "adding" : mode === "edit" ? "editing" : "deleting"
        } car:`,
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Make:
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Model:
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Year:
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Image URL (optional):
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default CarForm;
