import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import logo from '../images/logo2.png';
import Truck from '../images/truck.png';
import PushCart from '../images/cart.avif';

const BestFoodTruckApp = () => {
  const [userLatitude, setUserLatitude] = useState('');
  const [userLongitude, setUserLongitude] = useState('');
  const [bestTruck, setBestTruck] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
      },
      (error) => {
        setError('Unable to retrieve your location. Please enter manually.');
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userLatitude || !userLongitude) {
      setError('Please enter valid coordinates or use your current location.');
      return;
    }

    setError('');

    // Make an HTTP GET request to the API to find the best food truck
    axios
      .get(`/api/best-truck?lat=${userLatitude}&lon=${userLongitude}`)
      .then((response) => {
        setBestTruck(response.data);
      })
      .catch((error) => {
        setError('Error occurred while fetching data.');
        setBestTruck(null);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!selectedKey || !searchValue) {
      setError('Please select key and enter value to search.');
      setSearchResults([]);
      return;
    }

    setError('');

    // Make an HTTP GET request to the API to search for food trucks based on key-value pair
    setSearchValue(searchValue.toLowerCase());
    axios
      .get(`/api/search?key=${selectedKey}&value=${searchValue}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        setError('Error occurred while fetching search results.');
        setSearchResults([]);
      });
  };

  

  return (
    <div>
      <div className='navbar'>
        <img className='logo' src={logo} alt=''/>
        <div className='search'>
        <h4>Search Food Trucks</h4>
        <form onSubmit={handleSearch} className='search-bar'>
          <label>
            <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
              <option >Search by</option>
              <option value="Applicant">Name</option>
              <option value="Address">Street Name</option>
              <option value="ExpirationDate">Expiry Date</option>
            </select>
          </label>
          <label>
            <input
              type="text"
              placeholder='Value'
              value={searchValue}
              onChange={(e) => {setSearchValue(e.target.value)}}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        </div>
        <div className='best-truck'>
        <div className='best-truck-loc'>
          <h4>Find the Best Food Truck</h4>
          <span>Current Location</span><button onClick={handleUseCurrentLocation}><i class='bx bx-current-location'></i></button>
        </div>
        <form onSubmit={handleSubmit} className='best-truck-search'>
          <label>
            <input
              type="text"
              placeholder='Latitude'
              className='ip1'
              value={userLatitude}
              onChange={(e) => setUserLatitude(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder='Longitude'
              value={userLongitude}
              onChange={(e) => setUserLongitude(e.target.value)}
            />
          </label>
          <button type="submit">Find</button>
          
        </form>
        </div>
        {/* <div>
        <Link to='/api/add-truck'>
          <button>Add Truck</button>
        </Link>
        </div> */}
        

      </div>
      <div className='result-page'>
        {error && <p className='res-heading'>{error}</p>}
        {bestTruck && (
          <div className='res'>
            <h2 className='res-heading'>Best Food Truck</h2>
            <div className='res-content'>
              <img className='res-img' src={bestTruck.FacilityType==='Truck'?Truck:PushCart} alt=''/>
              <div className='res-details'>
                <p><span className='res-head'>ID : </span>{bestTruck.locationid}</p>
                <p><span className='res-head'>Name: </span>{bestTruck.Applicant}</p>
                <p><span className='res-head'>Facility Type: </span>{bestTruck.FacilityType}</p>
                <p><span className='res-head'>Address: </span>{bestTruck.Address}</p>
                <p><span className='res-head'>Food Items: </span>{bestTruck.FoodItems}</p>
                <p><span className='res-head'>Expiry Date: </span>{bestTruck.ExpirationDate}</p>
              </div>
              <div className='res-status'>
                {bestTruck.Status}
              </div>
            </div>
          </div>
        )}
        {searchResults.length > 0 && (
          <div className='res'>
            <h2 className='res-heading'>Available Trucks</h2>
              {searchResults.map((truck) => (
                <div key={truck.id} className='res-content'>
                  <img className='res-img' src={truck.FacilityType==='Truck'?Truck:PushCart} alt=''/>
                  <div className='res-details'>
                    <p><span className='res-head'>ID : </span>{truck.locationid}</p>
                    <p><span className='res-head'>Name: </span>{truck.Applicant}</p>
                    <p><span className='res-head'>Facility Type: </span>{truck.FacilityType}</p>
                    <p><span className='res-head'>Address: </span>{truck.Address}</p>
                    <p><span className='res-head'>Food Items: </span>{truck.FoodItems}</p>
                    <p><span className='res-head'>Expiry Date: </span>{truck.ExpirationDate}</p>
                  </div>
                  <div className='res-status' id='status'>
                    {truck.Status}
                  </div>
                </div>
              ))} 
          </div>
        )}
      </div>
      <div>
      </div> 
    </div>
  );
};

export default BestFoodTruckApp;
