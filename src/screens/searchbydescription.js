import React, { useState } from 'react';

const CarSearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = event => {
    setKeyword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`http://localhost:3001/search/${keyword}`)
      .then(response => response.json())
      .then(data => {
        if (data.Success) {
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <br />
          <label htmlFor="keyword">
            <strong>Enter Keyword:</strong>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="keyword"
            value={keyword}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {cars.length > 0 && (
        <div className="mt-4">
          <h2>Search Results:</h2>
          {cars.map(car => (
            <div key={car._id}>
              <p>Make: {car.make}</p>
              <p>Model: {car.model}</p>
              <p>Description: {car.description}</p>
            </div>
          ))}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4">
          <p className="text-danger">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CarSearchForm;
