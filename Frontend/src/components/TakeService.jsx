import './Main.css';
import { Link } from 'react-router-dom';

const TakeService = () => {
  return (
    <Link to="/FindService" className='link'>
      <div className="box-item">
        <img src='https://cdn-icons-png.flaticon.com/512/9727/9727444.png'/>
        <p>Take a service</p>
      </div>
    </Link>
  );
};

export default TakeService;
