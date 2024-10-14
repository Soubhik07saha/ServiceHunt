import './Main.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const FindService = ({ onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await axios.get('https://service-hunt.vercel.app/api/occupations');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching occupations:', error);
      }
    };

    fetchOccupations();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue.length > 0) {
      const filtered = services.filter((service) =>
        service.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  };

  const handleServiceSelect = (service) => {
    onServiceSelect(service);
  };

  return (
    <div className="find-service">
      <h2>Find a Service</h2>
      <input
        type="text"
        placeholder="Search for a service..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-box"
      />
      {filteredServices.length > 0 && (
        <ul className="service-list">
          {filteredServices.map((service, index) => (
            <li key={index} onClick={() => handleServiceSelect(service)}>
              {service}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

FindService.propTypes = {
  onServiceSelect: PropTypes.func.isRequired,
};

export default FindService;
