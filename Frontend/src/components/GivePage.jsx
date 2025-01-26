import './Main.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; 

const GivePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    location: '',
    address: '',
    occupation: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData); // Log the form data to verify
    try {
      const response = await axios.post('https://service-hunt.vercel.app/api/register', formData);
      console.log(response.data); // Log the response from the backend
      alert('Registration Complete. You can go back now.');
      navigate('/'); // Redirect to the home route or any other route you want
    } catch (error) {
      console.error('Error submitting form', error.response || error); // Log the error response
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className='grid-givepage-layout'>
      <div className='grid-givepage-form'>
        <div className='form-box'>
          <h2>Fill Your Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Occupation:</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className='grid-givepage-image'>
        <div className='box-image'>
          <img src="https://raw.githubusercontent.com/Soubhik07saha/ServiceHunt/refs/heads/main/Frontend/src/assets/Images/ServiceImg2.jpg" alt="Service" />
        </div>
      </div>
    </div>
  );
};

export default GivePage;
