import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarSearch.css';

function CarSearch() {
  const [showForm, setShowForm] = useState(false);
  const [make, setMake] = useState('');
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleButtonClick = () => {
    setShowForm(!showForm);
    setMake('');
    setCars([]);
    setErrorMessage('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/searchbymake/${make}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Success) {
          setCars(data.car);
          setErrorMessage('');
        } else {
          setCars([]);
          setErrorMessage(data.Message);
        }
      })
      .catch((error) => {
        setCars([]);
        setErrorMessage('Error retrieving car data.');
      });
  };

  return (
    <div className="container">
      <h1>Car Search</h1>
      <button
        className={`btn ${showForm ? 'btn-danger' : 'btn-primary'}`}
        onClick={handleButtonClick}
      >
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-3">
          <div className="form-group">
            <label htmlFor="make">Make:</label>
            <input
              type="text"
              id="make"
              className="form-control"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      )}

      {errorMessage && <p>{errorMessage}</p>}

      {cars.length > 0 && (
        <div className="car-list">
          <h2>Car List:</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CarSearch;
