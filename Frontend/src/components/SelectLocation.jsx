import './Main.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const SelectLocation = ({ selectedService }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://your-backend.vercel.app/api/cities');
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
    navigate(`/details/${city}/${selectedService}`);
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

SelectLocation.propTypes = {
  selectedService: PropTypes.string.isRequired,
};

export default SelectLocation;
