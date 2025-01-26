import './Main.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios';

const SelectLocation = ({ selectedService }) => {  // Accept selectedService as a prop
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // Update the API URL to the deployed backend
        const response = await axios.get('https://service-hunt-backend.vercel.app/api/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm(city);
    setFilteredCities([]);
    // Pass both city and service to the details route
    navigate(`/details/${city}/${selectedService}`);  // Corrected template string
  };

  return (
    <div className="select-location">
      <h2>Select Your Location</h2>
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-box"
      />
      {filteredCities.length > 0 && (
        <ul className="city-list">
          {filteredCities.map((city, index) => (
            <li key={index} onClick={() => handleCitySelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
      {selectedCity && <p>Selected Location: {selectedCity}</p>}
    </div>
  );
};

// Add PropTypes validation for selectedService
SelectLocation.propTypes = {
  selectedService: PropTypes.string.isRequired, // Add PropTypes validation for the selectedService prop
};

export default SelectLocation;
