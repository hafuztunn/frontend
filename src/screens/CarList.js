import React, { useEffect, useState } from 'react';
import './CarList.css'; // Import the CSS file

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    if (showCars) {
      fetch("http://localhost:3001/getAllMakesAndModels")
        .then(response => response.json())
        .then(data => {
          if (data.Success) {
            setCars(data.cars);
          } else {
            console.error('Getting cars failed:', data.Message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [showCars]);

  const handleButtonClick = () => {
    setShowCars(prevShowCars => !prevShowCars);
  };

  return (
    <div className="car-list-container">
      <nav className="car-list-header">
        <h1>Car List</h1>
        <button onClick={handleButtonClick}>{showCars ? 'Hide Cars' : 'Show Cars'}</button> {/* Toggle button to show/hide the list of cars */}
      </nav>
      {showCars && (
        <div>
          <table className="car-table">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                {/* Add more columns here if needed */}
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car._id}>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  {/* Render additional columns here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarList;
