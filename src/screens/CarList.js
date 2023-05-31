import React, { useEffect, useState } from 'react';
import './CarList.css'; // Import the CSS file

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/getAllMakesAndModels") // Replace '/api/cars' with the actual endpoint URL
      .then(response => response.json())
      .then(data => {
        if (data.Success) {
          setCars(data.cars);
          console.log(data.cars)
        } else {
          console.error('Getting cars failed:', data.Message);
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="car-list-container">
      <nav style={{ backgroundColor: 'blue', padding: '10px', color: 'white' }}>
        <h1>Car List</h1>
      </nav>
      <div className="columns-container">
        <div className="column">
          <h2 margin-right='19px'>Make</h2>
          {cars.map(car => (
            <ol>
            <div key={car._id}>
              <p>{car.make}</p>
            </div>
            </ol>
          ))}
        </div>
        <div className="column">
          <h2>Model</h2>
          {cars.map(car => (
          <ol>
            <div key={car._id}>
              <p>{car.model}</p>
            </div>
            </ol> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
