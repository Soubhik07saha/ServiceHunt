import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get route params
import axios from 'axios';

const Details = () => {
  const { city, service } = useParams(); // Get the city and service from the route params
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/details/${city}/${service}`);
        setDetails(response.data); // Set the fetched details
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchDetails();
  }, [city, service]);

  return (
    <div>
      <h2>Details for {service} in {city}</h2>
      {details.length > 0 ? (
        <ul>
          {details.map((detail, index) => (
            <li key={index}>
              <p>Name: {detail.name}</p>
              <p>Age: {detail.age}</p>
              <p>Phone Number: {detail.phone}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No details found for {service} in {city}.</p>
      )}
    </div>
  );
};

export default Details;

