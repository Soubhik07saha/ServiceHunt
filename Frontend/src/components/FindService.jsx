import './Main.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios'; // Import Axios for API requests

const FindService = ({ onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [services, setServices] = useState([]); // This will hold services from the API

  // Fetch occupations from the backend when the component mounts
  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/occupations');
        setServices(response.data); // Set the services from the backend
      } catch (error) {
        console.error('Error fetching occupations:', error);
      }
    };

    fetchOccupations();
  }, []); // Empty dependency array to fetch only once on component mount

  // Update search term and filter services based on search input
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

  // Handle service selection
  const handleServiceSelect = (service) => {
    onServiceSelect(service); // Notify the parent of the selected service
  };

  return (
    <div className="find-service">
      <h2>Find a Service</h2>
      
      {/* Search box */}
      <input
        type="text"
        placeholder="Search for a service..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-box"
      />
      
      {/* Dropdown of filtered services */}
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

// Add PropTypes validation
FindService.propTypes = {
  onServiceSelect: PropTypes.func.isRequired, // Expect onServiceSelect to be a function
};

export default FindService;
