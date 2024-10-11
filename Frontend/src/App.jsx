import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TakeService from './components/TakeService';
import GiveService from './components/GiveService';
import GivePage from './components/GivePage';
import FindService from './components/FindService';
import SelectLocation from './components/SelectLocation';
import Details from './components/Details'; // Import Details component
import PropTypes from 'prop-types';

function App() {
  const [selectedService, setSelectedService] = useState(null);

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <Router>
      <Routes>
        {/* Home page showing TakeService and GiveService options */}
        <Route path="/" element={<Home onServiceSelect={handleServiceSelect} />} />

        {/* Route for finding service and selecting location */}
        <Route
          path="/FindService"
          element={
            selectedService ? (
              <SelectLocation selectedService={selectedService} />
            ) : (
              <FindService onServiceSelect={handleServiceSelect} />
            )
          }
        />

        {/* Route for GivePage */}
        <Route path="/GivePage" element={<GivePage />} />

        {/* Route for Details with city and service as URL params */}
        <Route path="/details/:city/:service" element={<Details />} /> {/* Updated */}

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Home onServiceSelect={handleServiceSelect} />} />
      </Routes>
    </Router>
  );
}

// Define the Home component
const Home = ({ onServiceSelect }) => {
  return (
    <div className="box-container">
      <TakeService onServiceSelect={onServiceSelect} />
      <GiveService onServiceSelect={onServiceSelect} />
    </div>
  );
};

// Add prop-types validation
Home.propTypes = {
  onServiceSelect: PropTypes.func.isRequired,
};

export default App;
