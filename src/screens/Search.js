import React, { useState } from 'react';

const CarSearchForm = () => {
  const [make, setMake] = useState('');
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = event => {
    setMake(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`http://localhost:3001/searchbymake/${make}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
            console.log(data)
          setCars(data.cars);
          setErrorMessage('');
          
        } else {
          setCars([]);
          setErrorMessage(data.Message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setCars([]);
        setErrorMessage('An error occurred while getting the cars.');
      });

      console.log(cars)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <br />
          <label htmlFor="make">
            <strong>Enter Car Make:</strong>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="make"
            value={make}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {cars.map(car => (
          <ol>
            <div key={car._id}>
            <p>Make: {car.make}</p>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
            </div>
            </ol> 
          ))}

      {errorMessage && (
        <div className="mt-4">
          <p className="text-danger">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CarSearchForm;
