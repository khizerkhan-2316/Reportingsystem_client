import './MenuItem.css';
import { Link } from 'react-router-dom';

const MenuItem = ({ img, heading, alt, path }) => {
  return (
    <div className="list-item-icon">
      <img src={img} alt={alt} />
      <li>
        <h4>
          <Link to={path}>{heading}</Link>
        </h4>
      </li>
    </div>
  );
};

export default MenuItem;
