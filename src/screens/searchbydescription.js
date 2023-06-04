import React, { useState } from 'react';

const CarSearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [formVisible, setFormVisible] = useState(false);

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

  const handleToggleForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div>
      <button  type="button" className="btn btn-primary" onClick={handleToggleForm}>
        {formVisible ? 'Hide Form' : 'Show Form'}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} style={{ paddingLeft: '120px' }}>
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
      )}

      {cars.length > 0 && (
        <div className="mt-4">
          <h2>Search Results:</h2>
          <table style={{ paddingLeft: '120px' }} className="table table-bordered">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car._id}>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
