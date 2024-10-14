import './Main.css';
import { useState } from 'react';
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      console.log(response.data);
      alert('Registration Complete. You can go back now.');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form', error);
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
          <img src="./src/assets/Images/serviceImg2.jpg" alt="formimg" />
        </div>
      </div>
    </div>
  );
};

export default GivePage;