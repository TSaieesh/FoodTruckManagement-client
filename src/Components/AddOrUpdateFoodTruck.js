import React, { useState } from 'react';
import axios from 'axios';

const AddOrUpdateFoodTruck = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [facilityType, setFacilityType] = useState('');
  const [address, setAddress] = useState('');
  const [foodItems, setFoodItems] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !name || !facilityType || !address || !foodItems || !expiryDate || !status) {
      setError('All fields are required.');
      setMessage('');
      return;
    }

    setError('');

    const truckData = {
      id,
      name,
      facilityType,
      address,
      foodItems,
      expiryDate,
      status,
    };

    axios
      .post('/api/add-truck', truckData)
      .then((response) => {
        setMessage(response.data.message);
        setId('');
        setName('');
        setFacilityType('');
        setAddress('');
        setFoodItems('');
        setExpiryDate('');
        setStatus('');
      })
      .catch((error) => {
        setError('Error occurred while adding/updating the food truck.');
        setMessage('');
      });
  };

  return (
    <div>
      <h2>Add or Update Food Truck</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Facility Type:
          <input type="text" value={facilityType} onChange={(e) => setFacilityType(e.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Food Items:
          <input type="text" value={foodItems} onChange={(e) => setFoodItems(e.target.value)} />
        </label>
        <label>
          Expiry Date:
          <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </label>
        <label>
          Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddOrUpdateFoodTruck;
