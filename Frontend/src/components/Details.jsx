import './Main.css'; // Import the CSS file for styling
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const { city, service } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Updated API URL to use the correct backend endpoint
        const response = await axios.get(`https://service-hunt-backend.vercel.app/api/details/${city}/${service}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchDetails();
  }, [city, service]);

  return (
    <div className="details-container">
      <div className="details-header">
        <h2>Details for {service} in {city}</h2>
      </div>
      {details.length > 0 ? (
        <ul className="details-list">
          {details.map((detail, index) => (
            <li key={index} className="details-item">
              <p><strong>Name:</strong> {detail.name}</p>
              <p><strong>Age:</strong> {detail.age}</p>
              <p><strong>Phone Number:</strong> {detail.phone}</p>
              <p><strong>Address:</strong> {detail.address}</p>
              {/* Add other fields if necessary */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-details">No details found for {service} in {city}.</p>
      )}
    </div>
  );
};

export default Details;
