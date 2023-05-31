import React, { useState } from 'react';

const CarSearchForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [car, setCar] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event, inputType) => {
    const value = event.target.value;
    if (inputType === 'make') {
      setMake(value);
    } else if (inputType === 'model') {
      setModel(value);
    } else if (inputType === 'year') {
      setYear(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`http://localhost:3001/searchbymakemodelyear?make=${make}&model=${model}&year=${year}`)
      .then(response => response.json())
      .then(data => {
        if (data.Success) {
            console.log(data)
          setCar(data.car);
          setErrorMessage('');
        } else {
          setCar(null);
          setErrorMessage(data.Message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setCar(null);
        setErrorMessage('An error occurred while getting the car.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <br />
          <label htmlFor="make">
            <strong>Make:</strong>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="make"
            value={make}
            onChange={event => handleInputChange(event, 'make')}
          />
        </div>
        <div className="form-group">
          <br />
          <label htmlFor="model">
            <strong>Model:</strong>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="model"
            value={model}
            onChange={event => handleInputChange(event, 'model')}
          />
        </div>
        <div className="form-group">
          <br />
          <label htmlFor="year">
            <strong>Year:</strong>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="year"
            value={year}
            onChange={event => handleInputChange(event, 'year')}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {car.map(car => (
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
