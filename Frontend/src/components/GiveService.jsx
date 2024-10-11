import './Main.css';
import { Link } from 'react-router-dom';

const GiveService = () => {
  return (
    <Link to="/GivePage" className='link'>
      <div className="box-item">
        <img src='https://cdn-icons-png.flaticon.com/512/9631/9631363.png' />
        <p>Give a service</p>
      </div>
    </Link>
  );
};

export default GiveService;
