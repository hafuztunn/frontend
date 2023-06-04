import React, { useState } from 'react';

function CarSearch() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/${make}/${model}/${year}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Success) {
          setCarData(data.car);
          setErrorMessage('');
        } else {
          setCarData(null);
          setErrorMessage(data.Message);
        }
      })
      .catch((error) => {
        setCarData(null);
        setErrorMessage('Error retrieving car data.');
      });
  };

  return (
    <div>
      <h1>Car Search</h1>
      <button className="btn btn-primary" onClick={() => setShowForm(true)}>Show Form</button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="make">Make:</label>
          <input
            type="text"
            id="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />

          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

<button type="submit" className="btn btn-primary">
          Search
        </button>
        </form>
      )}

      {errorMessage && <p>{errorMessage}</p>}

      {carData && (
        <div>
          <h2>Car Data:</h2>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', border: '1px solid black' }}>Make</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Model</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Year</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Price</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Car-Type</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Engine</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Engine-Type</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Description</th>
                <th style={{ padding: '8px', border: '1px solid black' }}>Images</th>
                {/* Add more columns here if needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.make}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.model}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.year}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.price}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.carType}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.engine}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.engineType}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>{carData.description}</td>
                <td style={{ padding: '8px', border: '1px solid black' }}>
                  <img src={carData.images} alt="Car" style={{ width: '100px' }} />
                </td>
                {/* Render additional columns here */}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CarSearch;
